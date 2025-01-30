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

app.post('/post', async (req: Request, res: Response) => {
    const {
        title,
        content,
        author_id,
        category_id
    } = req.body;
    const date = new Date().getTime();
    console.log(req.body);
    const doesPostExist = await db.get(`
        SELECT * FROM posts WHERE title = ? AND author_id = ?
    `, [title, author_id]);

    if (doesPostExist) {
        res.send({
            success: false,
            message: 'Post already exists'
        });
        return;
    } else {
        await db.run(`
            INSERT INTO posts (
                title,
                content,
                author_id,
                date,
                category_id,
                id
            )
            VALUES (?, ?, ?, ?, ?, ?);
        `, [title, content, author_id, date, category_id, new Date().getTime()]);
        res.send({
            success: true,
            message: 'Post created successfully'
        });
    }

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


app.get('/get/posts', async (_req: Request, res: Response) => {
    const posts = await db.all(`
        SELECT * FROM posts;
    `);

    res.json(posts);
});

app.get('/get/categories', async (_req: Request, res: Response) => {
    const categories = await db.all(`
        SELECT * FROM categories;
    `);

    res.json(categories);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});