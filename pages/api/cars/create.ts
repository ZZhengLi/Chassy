import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../db/db';
import Car from '../../../db/models/car';
import {Types } from 'mongoose';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method == "POST") {
        try {
            await dbConnect();
    
            const body = req.body;
            await Car.create({
                license_plate: body.license_plate,
                brand: body.brand,
                model: body.model,
                color: body.color,
                car_owner_id: new Types.ObjectId(body.car_owner_id),
            }).catch(e => {
                // @ts-ignore
                return res.status(400).json({error:e.name, code:400, message: Object.values(e.errors).map(val => val.message)});
            });

            return res.status(201).json({result: null, code: 201, message: "create car success"});
        } catch (e) {
            console.log(e);
            return res.status(500).json({result: null, code: 500, message: "something went wrong"});
        }
    } 
  }