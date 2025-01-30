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
            date INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            pinned INTEGER
        );

        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY,
            content TEXT NOT NULL,
            author_id INTEGER NOT NULL,
            post_id INTEGER NOT NULL,
            date INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS interests (
            id INTEGER PRIMARY KEY,
            user_id INTEGER NOT NULL,
            post_id INTEGER NOT NULL
        );


        CREATE TABLE IF NOT EXISTS roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            color TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS userRoles (
            id INTEGER AUTO_INCREMENT PRIMARY KEY,
            user_id INTEGER NOT NULL,
            role_id INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            color TEXT NOT NULL
        );


        INSERT OR IGNORE INTO categories (id, name, color) VALUES
            (1, 'IRL', '#FF5733'),       -- Orange-red for real-life activities
            (2, 'Virtuel', '#3498DB'),    -- Blue for virtual events
            (3, 'Officiel', '#2ECC71'),   -- Green for official matters
            (4, 'Sortie', '#9B59B6'),     -- Purple for outings
            (5, 'Sport', '#E74C3C'),      -- Red for sports
        
            -- Additional categories
            (6, 'Études', '#F1C40F'),     -- Yellow for studies
            (7, 'Détente', '#1ABC9C'),    -- Teal for relaxation
            (8, 'Travail', '#34495E'),    -- Dark blue for work-related activities
            (9, 'Jeux', '#E67E22'),       -- Orange for gaming
            (10, 'Projets', '#95A5A6');   -- Gray for personal projects
        ;

    `);

    console.log('Database and table created successfully');
}

setupDatabase().catch((err) => {
    console.error('Error setting up the database:', err);
});


export default setupDatabase;