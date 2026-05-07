'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signInAction } from '@/actions/auth'
import { FormField } from '@/features/auth/components/form-field'
import { signInSchema, type SignInValues } from '@/features/auth/schemas'

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (values: SignInValues) => {
    const formData = new FormData()
    formData.set('email', values.email)
    formData.set('password', values.password)

    const result = await signInAction(formData)

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
        id="email"
        label="Email"
        type="email"
        error={errors.email?.message}
        registration={register('email')}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        error={errors.password?.message}
        registration={register('password')}
      />

      <button
        className="button-shadow text-preset-3 text-neutral-0 cursor-pointer rounded-lg bg-teal-700 px-4 py-3 disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  )
}
