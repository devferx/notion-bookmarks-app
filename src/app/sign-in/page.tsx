import { Logo } from '@/components/icons'
import Link from 'next/link'

import { SignInForm } from '@/features/auth/components/sign-in-form'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-100 px-4 dark:bg-neutral-900">
      <div className="card-shadow flex w-full max-w-md flex-col gap-8 rounded-xl bg-white px-5 py-8 dark:bg-neutral-800">
        <div className="flex items-center gap-2">
          <Logo size={32} />
          <h1 className="font-roboto text dark:text-neutral-0 text-xl leading-5 font-bold -tracking-[0.2px]">
            Bookmark Manager
          </h1>
        </div>

        <div>
          <h2 className="text-preset-1 dark:text-neutral-0 text-neutral-900">
            Log in to your account
          </h2>
          <p className="text-preset-4-medium text-neutral-800 dark:text-neutral-100">
            Welcome back! Please enter your details.
          </p>
        </div>

        <SignInForm />

        <div className="flex flex-col items-center gap-3">
          <p className="text-preset-4-medium flex items-center gap-1.5 text-neutral-800 dark:text-neutral-100">
            Forgot password?
            <Link
              className="text-preset-4 dark:text-neutral-0 text-neutral-900 hover:underline"
              href="/forgot-password"
            >
              Reset it
            </Link>
          </p>

          <p className="text-preset-4-medium flex items-center gap-1.5 text-neutral-800 dark:text-neutral-100">
            Don&apos;t have an account?
            <Link
              className="text-preset-4 dark:text-neutral-0 text-neutral-900 hover:underline"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
