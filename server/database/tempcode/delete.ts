import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';


const deleteTempCode = async (id: string) => {
    const db: Database = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.run(`
        DELETE FROM temporaryCode WHERE id = ?
    `, [id]);
}


export default deleteTempCode;