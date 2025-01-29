import nodemailer from "nodemailer";
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import addTempCode from "../database/tempcode/add";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




// Configure transporter
const transporter = nodemailer.createTransport({
    host: 'ssl0.ovh.net',
    port: 465,
    secure: true,
    auth: {
        user: 'administration@naflows.com',
        pass: '4@a2pC9dEa.PBcjYj^HbS#W)1v)[V0'
    }
});


function generateSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}


const texts: { [key: string]: (nom: string, prénom: string, code: number) => string } = {
    "Champo'Vento : connection": (nom: string, prénom: string, code: number) => {
        const templatePath = path.join(__dirname, 'patterns', 'code.html');
        const template = fs.readFileSync(templatePath, 'utf8');

        return template
            .replace('{{nom}}', nom)
            .replace('{{prenom}}', prénom)
            .replace('{{code}}', code.toString());
    }
}


interface MailRequest extends Request {
    params: {
        nom: string;
        prenom: string;
    };
}

async function sendMail(req: MailRequest, res: Response, subject: string) {
    try {
        const {nom, prenom} = req.params;
        const univMail = `${prenom.toLowerCase()}.${nom.toLowerCase()}@etud.univ-jfc.fr`;
        const code = generateSixDigitNumber();

        let info = await transporter.sendMail({
            from: 'support@naflows.com',
            to : univMail, 
            subject, 
            html : texts[subject](nom, prenom, code)
        });
        if (info.accepted.length > 0) {
            addTempCode(code, nom, prenom);
            res.status(200).send({
                success : true,
                code : info.text
            });
        } else {
            res.status(500).send({
                message: "Erreur, vérifiez vos identifiants",
                success : false
            });
        }
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

export default sendMail;