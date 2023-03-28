import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../db/db';
import ShopTransaction from '../../../db/models/shopTransaction';
import {Types } from 'mongoose';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();

        const body = req.body;

        // const shopTransaction = {
        //     user_id:body.user_id,
        //     shop_id:body.shop_id,
        //     date: new Date().setHours(0,0,0),
        //     car_amount: body.car_amount,
        //     price_per_unit: body.price_per_unit,
        //     total_price: body.car_amount * body.price_per_unit
        // };

        await ShopTransaction.create(body).catch(e => {
            // @ts-ignore
            res.status(400).json({error:e.name, code:400, message: Object.values(e.errors).map(val => val.message)});
        });
        res.status(201).json({result: null, code: 201, message: "create shopTransaction successful"});
    } catch (e) {
        console.log(e);
        res.status(500).json({result: null, code: 500, message: "something went wrong"});
    }
}