
import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

const addTempCode = async (tempCode: Number, nom: string, prenom : string) => {
    const db: Database = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    await db.run(`
        DELETE FROM temporaryCode WHERE nom = ? AND prenom = ?;
    `, [nom.toLowerCase(),prenom.toLowerCase()]);


    console.log(`
        Creating temporary code for ${nom} ${prenom}
    `);

    await db.run(`
        INSERT INTO temporaryCode (id, code, nom, prenom, expiration)
        VALUES (?, ?, ?, ?, ?);
    `, [Date.now(), tempCode, nom.toLowerCase(), prenom.toLowerCase(), Date.now() + 600000]);

}

export default addTempCode;