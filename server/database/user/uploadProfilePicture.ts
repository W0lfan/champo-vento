import { Request, Response } from 'express';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import checkTempCode from '../tempcode/check';
import addSession from '../sessions/add';
import CheckSession from '../sessions/check';
import { db } from '..';

const UploadProfilePicture = async (req: Request, res: Response) => {
    const {
        userID,
        profilePicture,
        token
    } = req.body;


    try {

        const sessionExists = await CheckSession(req, res,false);
        if (sessionExists) {
            await db.run(`
                UPDATE users
                SET profilePicture = ?
                WHERE id = ?;
            `, [profilePicture, userID]);
            res.send({
                success: true,
                message: 'Photo de profil mise à jour'
            });
        } else {
            res.send({
                success: false,
                message: 'Session invalide'
            });
        }


    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    }
};

export default UploadProfilePicture;