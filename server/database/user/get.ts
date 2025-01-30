import { Request, Response } from 'express';
import { db } from '..';


export const returnUser = async (
    id : string
) => {

    const user = await db.get(`
        SELECT * FROM users WHERE id = ?
    `, [id]);

    return {
        nom : user.nom,
        prenom : user.prenom,
        profilePicture : user.profilePicture,
        id : user.id
    };
};

export const GetUser = async (
    _req: Request,
    res: Response
) => {
    const { id } = _req.body;

    const user = await db.get(`
        SELECT * FROM users WHERE id = ?
    `, [id]);

    res.json({
        nom : user.nom,
        prenom : user.prenom,
        profilePicture : user.profilePicture,
        id : user.id
    });
};
