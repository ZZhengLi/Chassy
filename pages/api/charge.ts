import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../db/models/user';
import dbConnect from '../../db/db';
import {UserData} from '../../interfaces/index';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();

    var omise = require('omise')({
        'publicKey': process.env.OMISE_PUBLIC_KEY,
        'secretKey': process.env.OMISE_SECRET_KEY,
    });

    const body = _req.body;
    const {pcx, uuid, fname, lname, email} = _req.query;
    console.log(pcx, uuid)
   
    const {omiseToken, omiseSource} = body;
    console.log({token: body.omiseToken, source: body.omiseSource})
    if (omiseToken) {
        omise.charges.create({
        amount:     pcx,
        currency:   'thb',
        return_uri: 'https://c2e3-168-120-248-58.ngrok.io/status',
        card:       omiseToken,
        metadata:   {
            note:     'test card'
        }
    }).then(async (r: { return_uri: string | null; }) => {
        console.log(r.return_uri)
        if (r.return_uri != "" || r.return_uri != null) {
            try {
                const data: UserData = {
                    fname: String(fname),
                    lname: String(lname),
                    email: String(email),
                    userid: String(uuid),
                    customerid: ""
                }
                const user = await User.create(data)
                return res.status(201).redirect(307, String(r.return_uri));
              } catch (error) {
                res.status(400).json({ success: false })
              }
        }
        // return res.status(400).json({data: body.omiseToken, data2: body.omiseSource})
    }).catch((err: { code: any; message: any; failure_message: any; }) => {
        console.log(err.code)
        console.log(err.message)
        console.log(err.failure_message)
    })

    } else {
        console.log("condition2")
    }
   
}

export default handler
