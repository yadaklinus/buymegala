import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();


export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ user }: { user: any }) {
            try {
                if (!user.email) return false; // Ensure email exists

                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email },
                });

                if (!existingUser) {
                    const email = user.email;
                    const userName = email.split("@")[0];

                    await prisma.user.create({
                        data: {
                            email,
                            fullName: user.name || "",
                            userName,
                            profilePicture: user.image || "",
                        },
                    });
                }

                

                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false;
            } finally {
                await prisma.$disconnect(); 
            }
            
        },
         async jwt({token,user}){
            if(user){
                token.id = user.id;
            }
            return token;
        },
        async session({session,token}){
            session.user.id = token.id;
            return session;
        },
       
    },
    
        session:{
            strategy:"jwt",
        },
};