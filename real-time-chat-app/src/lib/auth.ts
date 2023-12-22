import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";

// to check if the environment variables are set up correctly
function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if(!clientId || clientId.length === 0) {
        throw new Error("Missing GOOGLE_CLIENT_ID")
    }

    if(!clientSecret || clientSecret.length === 0) {
        throw new Error("Missing GOOGLE_CLIENT_SECRET")
    }

    return { clientId, clientSecret }
}

// an object that holds the configuration options for 
export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db), // when someone logs in, the session is automatically stored in the redis database
    session: {
        strategy: "jwt", // jwt means JSON Web Token, meaning we don't handle the session on the database so that we can verify the session in middleware 
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        }),
        // GitHubProvider({
            
        // })
    ],
    callbacks: {
        async jwt ({ token, user }){
            const dbUser = (await db.get(`user:${token.id}`)) as User | null;

            if(!dbUser) {
                token.id = user!.id;
                return token;
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            }
        },

        async session({ session, token }) {
            if(token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }

            return session
        },

        // redirect() {
        //     return '/dashboard'
        // }
    },
}