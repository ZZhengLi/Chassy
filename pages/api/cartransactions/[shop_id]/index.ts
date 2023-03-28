/**
 * Sample API Call
 * http://localhost:3000/api/carTransactions/630fa9aec785d90443960507?page=1&itemSize=20&start_date=2022-09-01
 * 
 * @since 0.1.0
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../db/db';
import carTransactions from '../../../../db/models/carTransactions';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();
        
    let {
            query: { shop_id, start_date, finish_date, page, itemSize, nextCursor, sort},
            method,
          } = req; 

        
        if (nextCursor !== undefined && page === undefined) {
            let filterQuery = {
                start_date: {$gte: startOfDay(new Date(start_date as string)),$lte: endOfDay(new Date(start_date as string))}, 
                finish_date: finish_date ? ({$gte: startOfDay(new Date(finish_date as string)),$lte: endOfDay(new Date(finish_date as string))}) : null,
                shop_id: shop_id
            }
            if (nextCursor !== 'null') {
                // @ts-ignore
                filterQuery._id = {$lt: nextCursor}
            }

            // console.log(filterQuery);
            const items = await carTransactions.find(filterQuery).sort({_id: -1}).limit(parseInt(itemSize as string)).populate(
                [{path: 'services', model: 'Service', select:'service_name'}, {path: 'user_id', model: 'User', select: 'picture_url'}]
            ).exec();
            const next = items[items.length - 1]._id;
            const nextCount = await carTransactions.find({
                _id: next !== "null"? {$lt: next} : null,
                start_date: {$gte: startOfDay(new Date(start_date as string)),$lte: endOfDay(new Date(start_date as string))}, 
                finish_date: finish_date ? ({$gte: startOfDay(new Date(finish_date as string)),$lte: endOfDay(new Date(finish_date as string))}) : null,
                shop_id: shop_id
            }).count();
            
            const hasNext = nextCount !== 0? true: false ;
            
            // const hasNext = 
            res.status(200).json({
                data: items,
                nextCursor: hasNext == true ? next : null,
                hasNext: hasNext
            });

        } 
        else {
            let options = {
                sort: {start_date: sort? sort: "asc"},
                page: page,
                limit: itemSize,
                select: "car_id shop_id user_id services status total_price",
                populate: [{path: 'services', model: 'Service', select:'service_name'}, {path: 'user_id', model: 'User', select: 'picture_url'}]
            }
             // @ts-ignore
            const carTransactionsData = await carTransactions.paginate({
                start_date: {$gte: startOfDay(new Date(start_date as string)),$lte: endOfDay(new Date(start_date as string))}, 
                finish_date: finish_date ? ({$gte: startOfDay(new Date(finish_date as string)),$lte: endOfDay(new Date(finish_date as string))}) : null,
                shop_id: shop_id
            }, 
            options);
    
            let end_result = {
                data: carTransactionsData.docs,
                total_pages: carTransactionsData.totalPages,
                hasNextPage: carTransactionsData.hasNextPage,
                hasPrevPage: carTransactionsData.hasPrevPage,
                currentPage: carTransactionsData.page,
                nextPage: carTransactionsData.nextPage,
                prevPage: carTransactionsData.prevPage
            }
            
            res.status(200).json(end_result);
        }
       
    } catch (e) {
        // TODO also log to NewRelic logging@chassy.tech, Sentry, ex sentry.log(.....)
        console.error(e);
        // REVISE no need to send code: 200 in the result body, it's already in Response Header
        res.status(500).json({ result: null, code: 500, message: "something went wrong" });
    }
}