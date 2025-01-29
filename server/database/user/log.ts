import { Request, Response } from 'express';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import checkTempCode from '../tempcode/check';


const LogUser = async (req: Request, res: Response) => {
    const { 
        nom, 
        prenom,
        hashPassword,
        code 
     } = req.body;

    const db: Database = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    }); 

    const isCodeGood = await checkTempCode(req, res);

    const doesUserExist = await db.get(`
        SELECT * FROM users WHERE nom = ? AND prenom = ? AND passwordHash = ? 
    `, []); 

    if (!isCodeGood) {
        console.log("Code invalide");
        res.send({
            success: false,
            message: 'Code invalide'
        });
        return;
    } 

    if (!doesUserExist) {
        console.log("Utilisateur déjà existant");
        await db.run(`
            INSERT INTO users (
                id,
                nom,
                prenom,
                email,
                passwordHash
            )
        `, [new Date().getTime(), nom, prenom, req.body.email, hashPassword]);
        res.send({
            success: true,
            message: 'Utilisateur créé avec succès'
        });
        return;
    } else {
        console.log("Utilisateur connecté");
        res.send({
            success: true,
            message: 'Utilisateur connecté'
        });
        return;
    }
    
};


export default LogUser;