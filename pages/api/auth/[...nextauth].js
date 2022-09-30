import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { OAuth2Client } from 'google-auth-library'

const googleAuthClient = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'jabirdevauth',
            name: 'Jabir Developer Auth',
            credentials: {
                credential: { type: 'text' }
            },
            authorize: async (credentials) => {
                const token = credentials.credential
                const ticket = await googleAuthClient.verifyIdToken({
                    idToken: token,
                    audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
                })
                const payload = ticket.getPayload()
                if(!payload){
                    throw new Error('Cannot extract payload from signin token')
                }
                const {email, name, picture: image} = payload
                const user = {email, name, image}
                return user
            }
        })
    ],
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXT_PUBLIC_AUTH_SECRET
    },
    theme: {
        colorScheme: 'light'
    }
})