// // authMiddleware.js

// import { withIronSession } from "next-iron-session";

// export default function authMiddleware(handler) {
//   return async (req, res) => {
//     const session = await withIronSession(req);
// if (!session || !session.isAuthenticated || !session.ttl) {
//   res.redirect('/login');
// }

//     return handler(req, res);
//   };
// }
