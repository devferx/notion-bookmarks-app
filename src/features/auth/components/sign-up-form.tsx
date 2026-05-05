'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signUpAction } from '@/actions/auth'
import { FormField } from '@/features/auth/components/form-field'
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
      <FormField
        id="fullname"
        label="Full name"
        type="text"
        required
        error={errors.fullname?.message}
        registration={register('fullname')}
      />

      <FormField
        id="email"
        label="Email address"
        type="email"
        required
        error={errors.email?.message}
        registration={register('email')}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        required
        error={errors.password?.message}
        registration={register('password')}
      />

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
