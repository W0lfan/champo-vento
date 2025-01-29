
import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { db } from '..';

const addTempCode = async (tempCode: Number, nom: string, prenom : string) => {
    await db.run(`
        DELETE FROM temporaryCode WHERE nom = ? AND prenom = ?;
    `, [nom.toLowerCase(),prenom.toLowerCase()]);


    const lwcsNom = nom.toLowerCase();
    const lwcsPrenom = prenom.toLowerCase();
    await db.run(`
        INSERT INTO temporaryCode (id, code, nom, prenom, expiration)
        VALUES (?, ?, ?, ?, ?);
    `, [Date.now(), tempCode, lwcsNom, lwcsPrenom, Date.now() + 600000]);

}

export default addTempCode;