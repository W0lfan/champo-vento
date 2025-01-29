import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

export const db: Database = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});


async function setupDatabase() {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY UNIQUE,
            nom TEXT NOT NULL,
            prenom TEXT NOT NULL,
            profilePicture TEXT,
            licence TEXT,
            username TEXT,
            instagram TEXT,
            linkedin TEXT,
            bio TEXT,
            passwordHash TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS sessions (
            session_id TEXT PRIMARY KEY,
            user_id INTEGER NOT NULL,
            currentlyActive INTEGER NOT NULL,
            token TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS temporaryCode (
            id INTEGER PRIMARY KEY,
            nom TEXT NOT NULL,
            prenom TEXT NOT NULL,
            code INTEGER NOT NULL,
            expiration INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author_id INTEGER NOT NULL,
            date INTEGER NOT NULL  
        );

        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY,
            content TEXT NOT NULL,
            author_id INTEGER NOT NULL,
            post_id INTEGER NOT NULL,
            date INTEGER NOT NULL
        );


        CREATE TABLE IF NOT EXISTS roles (
            id INTEGER AUTO_INCREMENT PRIMARY KEY,
            role TEXT NOT NULL,
            color TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS userRoles (
            id INTEGER AUTO_INCREMENT PRIMARY KEY,
            user_id INTEGER NOT NULL,
            role_id INTEGER NOT NULL
        );
    `);

    console.log('Database and table created successfully');
}

setupDatabase().catch((err) => {
    console.error('Error setting up the database:', err);
});


export default setupDatabase;