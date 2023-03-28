import dbConnect from '../../../db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import Service from '../../../db/models/service';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();

        console.debug("API[services] " + req.method)
        if (req.method == "GET") {
            // Get all services
            const services = await Service.find().populate('shop')
            res.status(200).json(services);
        } else if (req.method == "POST") {
            // Create
            const service = req.body
            console.log("Service POST", service)
            const newService = new Service(service)
            await newService.save()
            console.debug(">>> New Service Created!")
            res.status(200).json(newService)
        } else if (req.method == "PUT") {
            // Update
            const service = req.body
            console.log("Service PUT", service)
            const theService = await Service.findById(service._id)
            console.log("---- before update", theService)
            theService.shop = service.shop
            theService.service_name = service.service_name
            theService.price = service.price
            theService.category = service.category
            await theService.save()
            console.debug(">>> Service Updated!")
            res.status(200).json(theService)
        } else {
            res.status(400).json({ message: "Not yet implemented" })
        }

    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}