import { Request, Response } from 'express';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import checkTempCode from '../tempcode/check';
import addSession from '../sessions/add';
import { db } from '..';

const LogUser = async (req: Request, res: Response) => {
    const { 
        nom, 
        prenom,
        hashPassword,
        code 
    } = req.body;

    try {
        const isCodeGood = await checkTempCode(req);

        if (!isCodeGood) {
            console.log("Code invalide");
            res.send({
                success: false,
                message: 'Code invalide'
            });
            return;
        }

        const doesUserExist = await db.get(`
            SELECT * FROM users WHERE nom = ? AND prenom = ? AND passwordHash = ? 
        `, [nom, prenom, hashPassword]);

        console.log(isCodeGood, "isCodeGood");

        const id = new Date().getTime();

        if (!doesUserExist) {
            const token = await addSession(req, id);
            await db.run(`
                INSERT INTO users (
                    id,
                    nom,
                    prenom,
                    passwordHash
                )
                VALUES (?, ?, ?, ?);
            `, [id, nom, prenom, hashPassword]);
            res.send({
                success: true,
                message: 'Utilisateur créé avec succès',
                token: token
            });
        } else {
            console.log("Utilisateur connecté");
            const token = await addSession(req, doesUserExist.id);
            res.send({
                success: true,
                message: 'Utilisateur connecté',
                token: token
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

export default LogUser;