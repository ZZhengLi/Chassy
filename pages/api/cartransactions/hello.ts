import dbConnect from '../../../db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import CarTransaction from '../../../db/models/carTransactions';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();

        console.debug("API[cartransactions] " + req.method)
        if (req.method == "GET") {
            // Get all cars transactions
            const cartransactions = await CarTransaction.find().populate("car_id")
            res.status(200).json(cartransactions);
        } else if (req.method == "POST") {
            // Create
            const cartransaction = req.body
            console.log("car transaction POST", cartransaction)
            const newCarTransaction = new CarTransaction(cartransaction)
            await newCarTransaction.save()
            console.debug(">>> New Car Created!")
            res.status(200).json(newCarTransaction)
        } else if (req.method == "PUT") {
            // Update
            const cartransaction = req.body
            console.log("Car Transaction PUT", cartransaction)
            const theCarTransaction = await CarTransaction.findById(cartransaction._id)
            console.log("---- before update", theCarTransaction)
            theCarTransaction._id = cartransaction._id
            theCarTransaction.car_id = cartransaction.car_id
            theCarTransaction.shop_id = cartransaction.shop_id
            theCarTransaction.imgId = cartransaction.imgId
            
            theCarTransaction.start_date = cartransaction.start_date
            theCarTransaction.finish_date = cartransaction.finish_date
            theCarTransaction.services = cartransaction.services
            theCarTransaction.total_price = cartransaction.total_price
            theCarTransaction.rating_from_customer = cartransaction.rating_from_customer
            theCarTransaction.review_from_customer = cartransaction.review_from_customer
            theCarTransaction.rating_from_shop = cartransaction.rating_from_shop
            theCarTransaction.review_from_shop= cartransaction.review_from_shop
            theCarTransaction.car_image = cartransaction.car_image
            theCarTransaction.evidence_image = cartransaction.evidence_image
            theCarTransaction.status = cartransaction.status
            theCarTransaction.__v = cartransaction.__v
            await theCarTransaction.save()
            console.debug(">>> Service Updated!")
            res.status(200).json(theCarTransaction)
        } else {
            res.status(400).json({ message: "Not yet implemented" })
        }

    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}