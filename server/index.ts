import express, { Request, Response } from 'express';
import cors from 'cors';
import sendMail from './mailing/sendMail';
import setupDatabase, { db } from './database';
// import checkTempCode from './database/tempcode/check';
import LogUser from './database/user/log';
import CheckSession from './database/sessions/check';
import UploadProfilePicture from './database/user/uploadProfilePicture';
import { GetUser, returnUser } from './database/user/get';

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

app.post('/interest', async (req: Request, res: Response) => {
    const {
        user_id,
        post_id
    } = req.body;

    const doesInterestExist = await db.get(`
        SELECT * FROM interests WHERE user_id = ? AND post_id = ?
    `, [user_id, post_id]);

    if (doesInterestExist) {
        await db.run(`DELETE FROM interests WHERE user_id = ? AND post_id = ?`, [user_id, post_id]);
        res.send({
            success: true,
            message: 'Interest deleted successfully'
        });
        return;
    } else {
        await db.run(`
            INSERT INTO interests (
                user_id,
                post_id,
                id
            )
            VALUES (?, ?, ?);
        `, [user_id, post_id, new Date().getTime()]);
        res.send({
            success: true,
            message: 'Interest created successfully'
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


app.post('/get/posts', async (_req: Request, res: Response) => {

    let { quantity, before } = _req.body;

    if (!before) {
        before = new Date().getTime();
    }

    console.log(quantity, before);


    const posts = await db.all(`
        SELECT * FROM posts
        WHERE date > ?
        ORDER BY date DESC
        LIMIT ? 
    `, [quantity, before]);

    res.json(posts);
});


app.post('/get/post', async (_req: Request, res: Response) => {
    const { id } = _req.body;

    const post = await db.get(`
        SELECT * FROM posts WHERE id = ?
    `, [id]);

    res.json(post);
});

app.post('/get/user', async (_req: Request, res: Response) => {
    GetUser(_req, res);
});

app.post('/get/category', async (_req: Request, res: Response) => {
    const { id } = _req.body;
    const category = await db.get(`
        SELECT * FROM categories WHERE id = ?
    `, [id]);

    if (category) {
        res.json({
            name : category.name,
            color : category.color
        });
    }
});

app.post('/post/comment', async (_req: Request, res: Response) => {
    const { content, author_id, post_id } = _req.body;
    const date = new Date().getTime();

    await db.run(`
        INSERT INTO comments (
            content,
            author_id,
            post_id,
            date,
            id
        )
        VALUES (?, ?, ?, ?, ?);
    `, [content, author_id, post_id, date, new Date().getTime()]);

    res.send({
        success: true,
        message: 'Comment created successfully'
    });
});

app.post('/delete/comment', async (_req: Request, res: Response) => {
    const { 
        comment_id,
        author_id
     } = _req.body;

    await db.run(`
        DELETE FROM comments WHERE id = ? AND author_id = ?
    `, [comment_id, author_id]);

    res.send({
        success: true,
        message: 'Comment deleted successfully'
    });
});

app.post('/get/interests', async (_req: Request, res: Response) => {
    const { post_id } = _req.body;

    const interests = await db.all(`
        SELECT * FROM interests WHERE post_id = ?
    `, [post_id]);

    res.json(interests);
});

app.post('/get/comments', async (_req: Request, res: Response) => {
    const { post_id } = _req.body;

    const comments = await db.all(`
        SELECT * FROM comments WHERE post_id = ?
    `, [post_id]);

    for (const comment of comments) {
        const user = await returnUser(comment.author_id);
        comment.user = user;
    }

    res.json(comments);
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