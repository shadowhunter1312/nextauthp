import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/app/lib/database/connection";
import Users from "@/app/lib/models/users";
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    TwitterProvider({
        clientId: process.env.TWITTER_ID,
        clientSecret: process.env.TWITTER_SECRET,
     
        
         // opt-in to Twitter OAuth 2.0
      }),
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        async authorize(credentials) {

          await dbConnect()
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
      
          const { email, password} = credentials;

                const user =await Users.findOne({ email });

                if (user) {
                const isPasswordMatched = await bcrypt.compare(password,user.password)

                if(!isPasswordMatched){
                   throw new Error("Invalid Email or password")
                }else {
                  if (user) {
                    return user
                  }
                }}else{
                  throw new Error("User not found");
                }
          // If no error and we have user data, return it
     
          // Return null if user data could not be retrieved
          return null
        }
      })
      
    // Add other providers as needed
  ],
  pages: {
    signIn: '/login',},
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // We can pass in additional information from the user document MongoDB returns
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
        };
      }
      return token;
    },
    // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  // Add configuration for database, session, callbacks, etc.
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };