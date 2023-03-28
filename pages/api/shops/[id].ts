import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../db/db';
import Shop from '../../../db/models/shop';
import { request } from 'http';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        await dbConnect();

        console.debug("API[shops] "+req.method)
        if (req.method == "GET") {
            // get the id from the request query
            const { id } = req.query;
            // find the shop by id
            const shop = await Shop.findById(id);
            if (!shop) {
                // if shop not found return 400
                res.status(400).json({ message: "Shop not found" });
            }
            // return the shop
            res.json(shop);
        
        } else if (req.method == "POST") {
            // Should not implement anyway
            res.status(400).json({ message: "Not yet implemented" })
        } else if (req.method == "DELETE") {
            const { id } = req.query        
            console.log("Shop DELETE",id)
            await Shop.deleteOne({ _id: id })
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
