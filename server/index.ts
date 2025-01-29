import express, { Request, Response } from 'express';
import cors from 'cors';
import sendMail from './mailing/sendMail';
import setupDatabase, { db } from './database';
// import checkTempCode from './database/tempcode/check';
import LogUser from './database/user/log';
import CheckSession from './database/sessions/check';
import UploadProfilePicture from './database/user/uploadProfilePicture';

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupDatabase();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(cors());

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello, world!');
}); 


app.post('/sendCode/:nom/:prenom', (req: Request, res: Response) => {
    const { nom, prenom } = req.params;
    console.log(`Nom: ${nom}, Prenom: ${prenom}`);
    sendMail(req, res, "Champo'Vento : connexion");
});

app.post('/token', (req: Request, res: Response) => {
    CheckSession(req, res,true);
});


app.post('/log', (req: Request, res: Response) => {
    LogUser(req, res);
});

app.post('/upload', async (req: Request, res: Response) => {
    await UploadProfilePicture(req, res);
});


app.get('/getroles/:userID', async (req: Request, res: Response) => {
    const allRelations = await db.all(`
        SELECT * FROM userRoles WHERE user_id = ?
    `, [req.params.userID]);

    const roles: any[] = [];

    for (const relation of allRelations) {
        const role = await db.get(`
            SELECT * FROM roles WHERE id = ?
        `, [relation.role_id]);
        console.log(role);
        roles.push(role);
    }

    res.json(roles);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});