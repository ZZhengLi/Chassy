import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../db/db';
import Owner from '../../../db/models/carOwner';
import users from '../../../db/models/user';

// check user type. before logic
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    if (_req.method == 'POST') {
        try {
            await dbConnect();
            const {email, username, password} = _req.body;
            if (username && password) {
                const owner = await users.findOne({
                    username: username,
                    password: password
                });
                console.log(owner)

                if (owner != "" || owner == null || owner == undefined) {
                    // have to return store detail just only name too
                    return res.status(200).json({owner_id: owner._id, user_type: owner.type, message: "login success"});
                } else {
                    return res.status(400).json("login fail");
                }
                
            } else {
                throw new Error("username or password is null");
            }
      
        } catch (e) {
            console.log(e)
            return res.status(500).json("something wrong")
        }
    }

}

export default handler;