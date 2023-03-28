import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../db/db';
import carTransactions from '../../../../db/models/carTransactions';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // can change car detail, status, review
    //finish date change after status change
    if (req.method == "POST") {
        try {
            await dbConnect();

            //id = transaction_id
            let {
                query: {id},
                body
            } = req; 
            
            console.log(body);
            const finalizeBody = {
                finish_date: new Date().toUTCString()
                ,...body}
            
                console.log(finalizeBody)
            const carTransaction = await carTransactions.findOneAndUpdate({_id: id}, {$set: finalizeBody}, {new: true, runValidators: true});
            res.status(200).json(carTransaction);
        } catch (e) {
            console.error(e);
            res.status(400).json(e);
        }
    }
   
    res.status(200);
}