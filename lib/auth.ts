import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma  from "./prisma"
import { SHA256 as sha256 } from "crypto-js";
import { encode, decode } from 'next-auth/jwt';

export const hashPassword = (password: string) => {
    return sha256(password).toString();
};


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.JWT_SECRET,
    session : {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "email", placeholder: "john@mail.com" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {

                if(!credentials?.email || !credentials?.password) {
                    return null
                }
                
                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });        

                if(!existingUser){
                    return null;
                }

                if(existingUser.hash !== hashPassword(credentials.password)){
                    return null;
                }

                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email,
                }
            }
        })
    ], 
    callbacks: {
        async jwt({token, user}) {
            if(user){
                return {
                    ...token, 
                    username: user.username
                }
            }
            return token;
        },
        async session({session, token}) {
            return {
                ...session, 
                user: {
                    ...session.user, 
                    username: token.username
                }
            };
        },
    }
}