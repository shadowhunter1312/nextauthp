import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  providers: [
    TwitterProvider({
        clientId: process.env.TWITTER_ID,
        clientSecret: process.env.TWITTER_SECRET,
        version: "2.0", // opt-in to Twitter OAuth 2.0
      }),
    // Add other providers as needed
  ],
  // Add configuration for database, session, callbacks, etc.
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };