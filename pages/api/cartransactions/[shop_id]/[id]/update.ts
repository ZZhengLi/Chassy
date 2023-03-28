import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../../db/db';
import carTransactions from '../../../../../db/models/carTransactions';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // can change car detail, status, review
    //finish date change after status change
    try {
        await dbConnect();
        
        const carTransaction = await carTransactions.findOne();

    } catch (e) {
        console.error(e);
    }

}