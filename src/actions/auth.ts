'use server'

import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

import { auth, signIn, signOut } from '@/auth'
import { signUpSchema } from '@/features/auth/schemas/sign-up.schema'

export type AuthActionResult =
  | { success: true }
  | { success: false; error: string }

export const signInAction = async (
  formData: FormData,
): Promise<AuthActionResult> => {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/',
    })
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Invalid email or password.' }
        default:
          return {
            success: false,
            error: 'Something went wrong. Please try again.',
          }
      }
    }

    throw error
  }
}

export const signUpAction = async (
  formData: FormData,
): Promise<AuthActionResult> => {
  const raw = {
    fullname: formData.get('fullname'),
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const parsed = signUpSchema.safeParse(raw)
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Invalid input.'
    return { success: false, error: message }
  }

  const { fullname, email, password } = parsed.data

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  // Check if email is already in use
  const { data: exists } = await supabase.rpc('auth_user_exists', {
    p_email: email,
  })

  if (exists) {
    return {
      success: false,
      error: 'An account with this email already exists.',
    }
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const { error: insertError } = await supabase.rpc('create_auth_user', {
    p_name: fullname,
    p_email: email,
    p_password_hash: passwordHash,
  })

  if (insertError) {
    console.error('[signUpAction] insert error:', insertError)
    return {
      success: false,
      error: 'Failed to create account. Please try again.',
    }
  }

  try {
    await signIn('credentials', { email, password, redirectTo: '/' })
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: 'Account created but sign-in failed. Please log in.',
      }
    }
    throw error
  }
}

export const signOutAction = async (): Promise<void> => {
  await signOut({ redirectTo: '/sign-in' })
}

export const getUserInfo = async () => {
  const session = await auth()

  return {
    name: session?.user?.name ?? '',
    email: session?.user?.email ?? '',
  }
}
