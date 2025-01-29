import { Request, Response } from 'express';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import deleteTempCode from './delete';
import { db } from '..';

const checkTempCode = async (req: Request): Promise<boolean> => {
    const { nom, prenom, code } = req.body;
    console.log(`Nom: ${nom}, Prenom: ${prenom}, Code: ${code}`);


    const tempCode = await db.get(`
        SELECT * FROM temporaryCode WHERE nom = ? AND prenom = ?
    `, [nom.toLowerCase(), prenom.toLowerCase()]);


    if (tempCode && parseInt(tempCode.code) === parseInt(code) && tempCode.expiration > Date.now()) {
        await deleteTempCode(tempCode.id);
        return true;
    } else {
        return false;
    }
}

export default checkTempCode;