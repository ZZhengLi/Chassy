import NextAuth, { User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import LineProvider from "next-auth/providers/line";
// TODO add logging
// import log from "logging-service"

export const authOptions = {
  pages: {
    signIn: "/",
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  logger: {
    // @ts-ignore
    error(code, metadata) {
      // log.error(code, metadata)
      console.error(code, metadata);
    },
    // @ts-ignore
    warn(code) {
      // log.warn(code)
      console.warn(code);
    },
    // @ts-ignore
    debug(code, metadata) {
      // log.debug(code, metadata)
      console.debug(code, metadata);
    },
  },

  providers: [
    // TODO remove CredentialsProvider as this is only for testing.
    CredentialsProvider({
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        // TODO Add logic here to look up the user from the credentials supplied
        return {
          id: "1",
          name: "J Smith",
          email: "jsmith@example.com",
          image:
            "https://profile.line-scdn.net/0hhb3p0fHDN00OCSPEbqpIGjJMOSB5JzEFdmp-f3xebSkqa3BPNT8reX9ca34mPiITNjsrLyMJOypw",
        };
      },
    }),

    LineProvider({
      // @ts-ignore
      clientId: process.env.LINE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.LINE_CLIENT_SECRET,

      // ??? does the following setting contribute to anything?
      scope: "profile openid email",
      openId: true,
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile?.name,
          email: profile?.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    // @ts-ignore
    async signIn({ user, account, profile, email, credentials }) {
      console.log("callbacks/signIn", {
        user,
        account,
        profile,
        email,
        credentials,
      });
      // TODO record this in our DB
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      console.log("callbacks/redirect", { url, baseUrl });
      return url;
    },
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
// @ts-ignore
export default NextAuth(authOptions);
