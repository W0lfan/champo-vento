import express, { Request, Response } from 'express';
import cors from 'cors';
import sendMail from './mailing/sendMail';
import setupDatabase from './database';
import checkTempCode from './database/tempcode/check';

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupDatabase();


app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

app.post('/sendCode/:nom/:prenom', (req: Request, res: Response) => {
    const { nom, prenom } = req.params;
    console.log(`Nom: ${nom}, Prenom: ${prenom}`);
    sendMail(req, res, "Champo'Vento : connection");
});

app.post('/checkCode/:nom/:prenom/:code', (req: Request, res: Response) => {
    const { nom, prenom, code } = req.params;
    console.log(`Nom: ${nom}, Prenom: ${prenom}, Code: ${code}`);
    checkTempCode(req, res);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});