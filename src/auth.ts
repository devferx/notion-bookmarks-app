import { SupabaseAdapter } from '@auth/supabase-adapter'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { ZodError } from 'zod'

import { signInSchema } from '@/features/auth/schemas'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...(supabaseUrl && supabaseServiceRoleKey
    ? {
        adapter: SupabaseAdapter({
          url: supabaseUrl,
          secret: supabaseServiceRoleKey,
        }),
      }
    : {}),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!supabaseUrl || !supabaseServiceRoleKey) return null
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)

          const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

          const { data: users } = await supabase.rpc('get_auth_user_by_email', {
            p_email: email,
          })
          const user = users?.[0] ?? null

          if (!user?.password_hash) return null

          const isValid = await bcrypt.compare(password, user.password_hash)
          if (!isValid) return null

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          }
        } catch (error) {
          if (error instanceof ZodError) return null
          return null
        }
      },
    }),
  ],
})
