import { type InputHTMLAttributes } from 'react'
import { type UseFormRegisterReturn } from 'react-hook-form'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  required?: boolean
  error?: string
  registration: UseFormRegisterReturn
}

export const FormField = ({
  id,
  label,
  required,
  error,
  registration,
  ...inputProps
}: Props) => (
  <div className="grid gap-1.5">
    <label
      className="text-preset-4 dark:text-neutral-0 text-neutral-900"
      htmlFor={id}
    >
      {label}
      {required && (
        <span className="text-teal-70 dark:text-neutral-100">*</span>
      )}
    </label>
    <input
      className="bg-neutral-0 text-input-shadow rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
      id={id}
      aria-invalid={Boolean(error)}
      {...inputProps}
      {...registration}
    />
    {error && <span className="text-preset-5 text-red-600">{error}</span>}
  </div>
)
