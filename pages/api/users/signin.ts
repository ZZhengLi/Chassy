import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../db/db';
import users from '../../../db/models/user';
//import jwt from 'jsonwebtoken';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (_req.method === 'POST') {
    try {
      await dbConnect();
      const { email, password } = _req.body;

      if (email && password) {
        const owner = await users.findOne({
            email: email,
            password: password
        });

        console.log('owner:', owner);

        if (owner) {
          // const token = jwt.sign({ ownerId: owner._id }, process.env.JWT_SECRET, {
          //   expiresIn: '1h'
          // });
          console.log('login successful');
          
          res.redirect('/Home');
          //res.setHeader('Set-Cookie', `token=${token}; HttpOnly; SameSite=Strict`);
          res.status(200).json({owner_id: owner._id, user_type: owner.type, message: "login success"});
        } else {
          console.log('login failed');
          //res.redirect('/SignIn');
          res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        console.log('username or password is null');
        //res.redirect('/SignIn');
        res.status(400).json({ message: 'Email and password are required' });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

export default handler;
