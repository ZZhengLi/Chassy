import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../db/db';
import User from '../../../db/models/user';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();

        console.debug("API[users] "+req.method)
        if (req.method == "GET") {
          const users = await User.find().populate('shop')
            res.status(200).json(users);
        } else if (req.method == "POST") {
            // Create
            const user = req.body
            console.log("User POST", user)
            const newUser = new User(user)
            await newUser.save()
            console.debug(">>> New User Created!")
            res.status(200).json(newUser)
        } else if (req.method == "PUT") {
            // Update
            const user = req.body
            console.log("User PUT", user)
            const theUser = await User.findById(user._id)
            console.log("---- before update", theUser)
            theUser.user = user.name
            theUser.register_name = user.register_name
            theUser.owner = user.owner
            theUser.location = user.location
            theUser.phone_number = user.phone_number
            await theUser.save()
            console.debug(">>> Service Updated!")
            res.status(200).json(theUser)
        } else {
            res.status(400).json({ message: "Not yet implemented" })
        }
            
    } catch (e) {
        console.error("yeah im the error",e);
        res.status(500).json(e);
    }

}


