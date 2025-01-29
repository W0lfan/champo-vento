import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';



async function setupDatabase() {
    const db: Database = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            nom TEXT NOT NULL,
            prenom TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            profilePicture TEXT,
            licence TEXT,
            passwordHash TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS sessions (
            session_id INTEGER PRIMARY KEY,
            user_id INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS temporaryCode (
            id INTEGER PRIMARY KEY,
            nom TEXT NOT NULL,
            prenom TEXT NOT NULL,
            code INTEGER NOT NULL,
            expiration INTEGER NOT NULL
        );
    `);

    console.log('Database and table created successfully');
}

setupDatabase().catch((err) => {
    console.error('Error setting up the database:', err);
});


export default setupDatabase;