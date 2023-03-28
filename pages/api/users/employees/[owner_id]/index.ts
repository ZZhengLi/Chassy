import type { NextApiRequest, NextApiResponse } from 'next'
import users from '../../../../../db/models/user';
import dbConnect from '../../../../../db/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    //method get
    try {
        await dbConnect();
        //do it
    let {
            query: { owner_id, page, itemSize},
           
          } = req; 

        const options = {
            page: page,
            limit: itemSize,
            select: 'first_name last_name shop_id picture_url',
            populate: [{path: 'shop_id', model: 'Shop', select:'name_th name_en -_id'}]
        }

        // @ts-ignore
        const usersData = await users.paginate({
            owner_id: owner_id,
            user_type: "employee"
        }, options);
        res.status(200).json(usersData);
        // const CarTransactions = await carTransactions.paginate({
        //     start_date: {$gte: startOfDay(new Date(start_date)),$lte: endOfDay(new Date(start_date))}, 
        //     finish_date: finish_date ? ({$gte: startOfDay(new Date(finish_date)),$lte: endOfDay(new Date(finish_date))}) : null,
        //     shop_id: shop_id
        // }, 
        // options);

        
        // res.status(200).json({result: , code: 200});
    } catch (e) {
        console.log(e);
        res.status(500).json({result: null, code: 500, message: "something went wrong"});
    }
}