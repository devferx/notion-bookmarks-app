'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signUpAction } from '@/actions/auth'
import {
  signUpSchema,
  type SignUpValues,
} from '@/features/auth/schemas/sign-up.schema'

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (values: SignUpValues) => {
    const formData = new FormData()
    formData.set('fullname', values.fullname)
    formData.set('email', values.email)
    formData.set('password', values.password)

    const result = await signUpAction(formData)

    if (!result.success) {
      toast.error(result.error)
    }
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="grid gap-1.5">
        <label
          className="text-preset-4 dark:text-neutral-0 text-neutral-900"
          htmlFor="fullname"
        >
          Full name
          <span className="text-teal-70 dark:text-neutral-100">*</span>
        </label>
        <input
          className="bg-neutral-0 text-input-shadow rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
          type="text"
          id="fullname"
          aria-invalid={Boolean(errors.fullname)}
          {...register('fullname')}
        />
        {errors.fullname?.message && (
          <span className="text-preset-5 text-red-600">
            {errors.fullname.message}
          </span>
        )}
      </div>

      <div className="grid gap-1.5">
        <label
          className="text-preset-4 dark:text-neutral-0 text-neutral-900"
          htmlFor="email"
        >
          Email address
          <span className="text-teal-70 dark:text-neutral-100">*</span>
        </label>
        <input
          className="bg-neutral-0 text-input-shadow rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
          type="email"
          id="email"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email?.message && (
          <span className="text-preset-5 text-red-600">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="grid gap-1.5">
        <label
          className="text-preset-4 dark:text-neutral-0 text-neutral-900"
          htmlFor="password"
        >
          Password
          <span className="text-teal-70 dark:text-neutral-100">*</span>
        </label>
        <input
          className="bg-neutral-0 text-input-shadow rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
          type="password"
          id="password"
          aria-invalid={Boolean(errors.password)}
          {...register('password')}
        />
        {errors.password?.message && (
          <span className="text-preset-5 text-red-600">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        className="button-shadow text-preset-3 text-neutral-0 cursor-pointer rounded-lg bg-teal-700 px-4 py-3 disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  )
}
