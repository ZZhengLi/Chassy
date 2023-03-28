import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../db/db';
import CarOwner from '../../../db/models/carOwner';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method == "POST") {
        try {
            await dbConnect();
    
            const body = req.body;
            await CarOwner.create(body).catch(e => {
                // @ts-ignore
                res.status(400).json({error:e.name, code:400, message: Object.values(e.errors).map(val => val.message)});
            });;

            res.status(201).json({result: null,code: 201, message: "create car's owner success"});
        } catch (e) {
            console.log(e);
            res.status(500).json({result: null, code: 500, message: "something went wrong"});
        }
    } 
  }