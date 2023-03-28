import dbConnect from '../../../db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import CarOwner from '../../../db/models/carOwner';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();

        console.debug("API[owners] " + req.method)
        if (req.method == "GET") {
            // Get all services
            const owners = await CarOwner.find()
            res.status(200).json(owners);
        } else if (req.method == "POST") {
            // Create
            const owner = req.body
            console.log("Owner POST", owner)
            const newOwner = new CarOwner(owner)
            await newOwner.save()
            console.debug(">>> New Owner Created!")
            res.status(200).json(newOwner)
        } else if (req.method == "PUT") {
            // Update
            const owner = req.body
            console.log("Owner PUT", owner)
            const theOwner = await CarOwner.findById(owner._id)
            console.log("---- before update", theOwner)
            theOwner.line_id = owner.line_id
            theOwner.first_name = owner.first_name
            theOwner.last_name = owner.last_name
            theOwner.phone_number = owner.phone_number
            theOwner.email = owner.email
            await theOwner.save()
            console.debug(">>> Owner Updated!")
            res.status(200).json(theOwner)
        } else {
            res.status(400).json({ message: "Not yet implemented" })
        }

    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}