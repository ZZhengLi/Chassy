import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../db/db';
import Service from '../../../db/models/service';
import { request } from 'http';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        await dbConnect();

        console.debug("API[services] "+req.method)
        if (req.method == "GET") {
            // get the id from the request query
            const { id } = req.query;
            // find the service by id
            const service = await Service.findById(id);
            if (!service) {
                // if service not found return 400
                res.status(400).json({ message: "Service not found" });
            }
            // return the service
            res.json(service);
        
        } else if (req.method == "POST") {
            // Should not implement anyway
            res.status(400).json({ message: "Not yet implemented" })
        } else if (req.method == "DELETE") {
            const { id } = req.query        
            console.log("Service DELETE",id)
            await Service.deleteOne({ _id: id })
            console.log(">>> DELETED")
            res.status(200).json({statusText:"deleted"})
        } else if (req.method == "PUT") {
            // Tank.updateOne({ size: 'large' }, { name: 'T-90' }, function(err, res) {
            //     // Updated at most one doc, `res.nModified` contains the number
            //     // of docs that MongoDB updated
            //   });
                        // const car = await cars.findOneAndUpdate({_id: id}, {$set: body}, {new: true, runValidators: true});
            // res.status(200).json(car);
            res.status(400).json({ message: "Not yet implemented" })
        }
            
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}
