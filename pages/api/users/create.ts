import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../db/db';
import User from '../../../db/models/user';
import bcrypt from 'bcrypt';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        await dbConnect();

        await User.create(_req.body).catch(e => {
            // @ts-ignore
            res.status(400).json({error:e.name, message: Object.values(e.errors).map(val => val.message)});
        });
        return res.status(201).json("create users success");
    } catch (e) {
        console.log(e)
        return res.status(400).json(e)
    }
    
}

export default handler;