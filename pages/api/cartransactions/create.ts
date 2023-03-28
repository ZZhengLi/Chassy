import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'db/db';
import CarTransaction from 'db/models/carTransactions';
import {Types } from 'mongoose';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();

        const body = req.body;

    //     const carTransaction = {
    //         car_id: new Types.ObjectId(body.car_id),
    //         shop_id: new Types.ObjectId(body.shop_id),
    //         user_id: new Types.ObjectId(body.user_id),
    //         services: body.services,
    //         start_date: new Date(body.start_date).setHours(0,0,0),
    //         finish_date: new Date(body.finish_date).setHours(0,0,0),
    //         total_price: body.total_price,
    //         rating_from_customer: body.rating_from_customer,
    //         review_from_customer: body.review_from_customer ?? "",
    //         rating_from_shop: body.rating_from_shop,
    //         review_from_shop: body.review_from_shop ?? "",
    //         car_image: body.car_image,
    //         evidence_image: body.evidence_image,
    //         status: body.status
    // }

        await CarTransaction.create(body).catch(e => {
            // @ts-ignore
            res.status(400).json({error:e.name, code:400, message: Object.values(e.errors).map(val => val.message)});
        });
        res.status(201).json({result: null, code: 201, message: "create carTransaction successful"});
    } catch (e) {
        console.log(e);
        res.status(500).json({result: null, code: 500, message: "something went wrong"});
    }
}