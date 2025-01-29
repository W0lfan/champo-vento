import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { db } from '..';


const deleteTempCode = async (id: string) => {
    await db.run(`
        DELETE FROM temporaryCode WHERE id = ?
    `, [id]);
}


export default deleteTempCode;