import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../db/db';
import Shop from '../../../db/models/shop';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();

        console.debug("API[shops] "+req.method)
        if (req.method == "GET") {
          const shops = await Shop.find().populate('owner')
            res.status(200).json(shops);
        } else if (req.method == "POST") {
            // Create
            const shop = req.body
            console.log("Shop POST", shop)
            const newShop = new Shop(shop)
            await newShop.save()
            console.debug(">>> New Shop Created!")
            res.status(200).json(newShop)
        } else if (req.method == "PUT") {
            // Update
            const shop = req.body
            console.log("Shop PUT",  req.body)
            const theShop = await Shop.findById(shop._id)
            console.log("---- before update", theShop)
            theShop.name = shop.name
            theShop.registered_name = shop.registered_name
            theShop.owner = shop.owner
            theShop.location = shop.location
            theShop.phone_number = shop.phone_number
            theShop.remaining_cars = shop.remaining_cars
            theShop.branch = shop.branch
            await theShop.save()
            console.debug(">>> Service Updated!")
            res.status(200).json(theShop)
        } else {
            res.status(400).json({ message: "Not yet implemented" })
        }
            
    } catch (e) {
        console.error("yeah im the error",e);
        res.status(500).json(e);
    }

}