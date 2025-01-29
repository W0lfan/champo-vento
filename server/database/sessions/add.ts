import { Request } from 'express';
import { hashString } from '../../utils/hash';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { db } from '..';

const addSession = async (req: Request, userID: number) => {
    const ipAdress = req.ip;
    const userAgent = req.get('User-Agent');
    const hashedContent = await hashString(ipAdress + userAgent);



    const sessionExists = await db.get(`
        SELECT * FROM sessions WHERE session_id = ? AND user_id = ?
    `, [hashedContent, userID]);

    if (!sessionExists) {
        const token = await hashString(
            Date.now() + ipAdress + userAgent + userID
        );
        await db.run(`
            INSERT INTO sessions (session_id, user_id, currentlyActive, token)
            VALUES (?, ?, ?, ?);
        `, [hashedContent, userID, 1, token]);
        return token;
    } else {
        return sessionExists.token;
    }
}

export default addSession;
