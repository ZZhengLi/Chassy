import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../db/db';
import cars from '../../../../db/models/car';
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

        //id = car_id
        let {
            query: {id},
            body
        } = req; 

        if (req.method == "GET") {
          
            const car = await cars.findById(id).populate({path: 'car_owner_id', select: "-__v"}).exec();
            res.status(200).json(car);

        } else if (req.method == "POST") {
            // update data
            const car = await cars.findOneAndUpdate({_id: id}, {$set: body}, {new: true, runValidators: true});
            res.status(200).json(car);
        }
            
    } catch (e) {
        console.error(e);
        res.status(500).json("something went wrong");
    }

}