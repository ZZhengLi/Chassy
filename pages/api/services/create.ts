/**
 * SUSPECT DUPLICATED functionalities are all in index.
 */
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../db/db';
import Service from '../../../db/models/service';
import {Types} from 'mongoose';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();

        const body = req.body;
        console.log(body.shop_id)
        const service = {
            shop_id: new Types.ObjectId(body.shop_id),
            service_name: body.service_name,
            price: body.price,
            category: body.category ?? ""
        }

        await Service.create(service).catch(e => {
            // @ts-ignore
            return res.status(400).json({error:e.name, code:400, message: Object.values(e.errors).map(val => val.message)});
        });

        return res.status(201).json({result: null, code: 201, message: "create service sucessful"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({result: null, code: 500, message: "something went wrong"});
    }
}