import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'db/db';
import carTransactions from 'db/models/carTransactions';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
   
    if (req.method == "POST") {
        try {
            await dbConnect();

            let {
                query: {trx_id},
                body
            } = req; 
            
            console.log(body);
            const carTransaction = await carTransactions.findOneAndUpdate({_id: trx_id}, {$set: body}, {new: true, runValidators: true});
            res.status(200).json(carTransaction);
        } catch (e) {
            console.error(e);
            res.status(400).json(e);
        }
    }
   
    res.status(200);
}