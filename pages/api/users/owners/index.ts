import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../db/db';
import Owner from '../../../../db/models/carOwner';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        const owners = await Owner.find();
        console.log(owners)
        return res.status(200).json(owners);
    } catch (e) {
        console.log(e)
        return res.status(400).json(e)
    }
    
}

export default handler;