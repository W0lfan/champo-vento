import { Request, Response } from 'express';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import deleteTempCode from './delete';

const checkTempCode = async (req: Request, res: Response) => {
    const { nom, prenom, code } = req.params;
    console.log(`Nom: ${nom}, Prenom: ${prenom}, Code: ${code}`);

    const db: Database = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    })

    const tempCode = await db.get(`
        SELECT * FROM temporaryCode WHERE nom = ? AND prenom = ?
    `, [nom, prenom]);

    if (tempCode.code === code) {
        await deleteTempCode(tempCode.id);
        res.send({
            success : true
        });
    } else {
        res.send({
            success : false
        });
    }
}

export default checkTempCode;