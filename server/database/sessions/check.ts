import { Request, Response } from 'express';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { db } from '..';


const CheckSession = async (req: Request, res: Response, sendToUser : boolean) => {


    const { token } = req.body;


    const session = await db.get(`
        SELECT * FROM sessions WHERE token = ?
    `, [token]);db

    if (!session) {
        if (sendToUser) {
            res.send({
                success: false,
                message: 'Session invalide'
            });
        }
        return false;
    } else {
        if (sendToUser) {
            const user = await db.get(`
                SELECT * FROM users WHERE id = ?
            `, [session.user_id]);
            res.send({
                success: true,
                message: 'Session valide',
                user : user
            });
        }
        return true;
    }
}

export default CheckSession;