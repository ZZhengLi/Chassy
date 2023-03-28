import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../db/db';
import User from '../../../db/models/user';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();

        console.debug("API[users] "+req.method)
        if (req.method == "GET") {
          const users = await User.find()
            res.status(200).json(users);
        } else {
            res.status(400).json({
                message: "Not yet implemented"
            })
        }
            
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }

}