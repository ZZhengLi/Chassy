import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'db/db';
import carTransactions from 'db/models/carTransactions';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();
        let {
            query: { shop_id, start_date, finish_date},
            method,
          } = req; 

        if (method === "GET") {
            let totalRevenueSum = 0;
            let count = 0;
            const transactions = await carTransactions.find({
                start_date: {$gte: startOfDay(new Date(start_date as string)),$lte: endOfDay(new Date(start_date as string))}, 
                finish_date: finish_date ? ({$gte: startOfDay(new Date(finish_date as string)),$lte: endOfDay(new Date(finish_date as string))}) : null,
                shop_id: shop_id
            });

            for (const transaction of transactions) {
                totalRevenueSum += transaction.total_price;
                count ++;
            }

            res.status(200).json({
                revenue: totalRevenueSum,
                carCount: count
            });

        } else {
            throw new Error("wrong api method");
        }

    } catch(e) {
        console.error(e);
        res.status(500).json("something went wrong");
    }
}