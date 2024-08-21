import NextAuth from 'next-auth';
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config({ path: 'variables_db.env' })

async function getUser(username: string): Promise<User | undefined> {
    try {
       
        const result = await fetch(`http://` + process.env.HOST_DEV +  `/users/${username}`)
        const user = await result.json()
        return user;
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ username: z.string().min(3), password: z.string().min(3) })
                .safeParse(credentials)

            if (parsedCredentials.success) {
                const { username, password } = parsedCredentials.data
                const user = await getUser(username)
                if (!user) return null

                const passwordsMatch = await bcrypt.compare(password, user.password)

                if (passwordsMatch) return user
            }
            return null
        }
    })]

})