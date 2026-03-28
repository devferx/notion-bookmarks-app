'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { Close } from '@/components/icons'

import {
  bookmarkFormSchema,
  type BookmarkFormValues,
} from '@/features/bookmarks/schemas/bookmark-form.schema'

import { BOOKMARK_DESCRIPTION_MAX_LENGTH } from '@/core/constants/bookmark'

interface BookmarkFormProps {
  defaultValues?: BookmarkFormValues
  onClose?: () => void
  onSubmit: (values: BookmarkFormValues) => Promise<void>
}

export const BookmarkForm = ({
  defaultValues,
  onClose = () => {},
  onSubmit,
}: BookmarkFormProps) => {
  const {
    control,
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm<BookmarkFormValues>({
    resolver: zodResolver(bookmarkFormSchema),
    defaultValues,
  })

  const descriptionLength =
    useWatch({ control, name: 'description' })?.length ?? 0

  const onSubmitForm = async (values: BookmarkFormValues) => {
    await onSubmit(values)
    onClose()
  }

  return (
    <form
      className="bg-neutral-0 relative flex w-full max-w-[500px] flex-col gap-8 rounded-2xl border border-transparent px-5 py-6 dark:border-neutral-500 dark:bg-neutral-800"
      onSubmit={handleSubmit(onSubmitForm)}
      noValidate
    >
      <button
        className="absolute top-5 right-5 cursor-pointer rounded-lg border border-neutral-400 p-1.5"
        type="button"
        onClick={onClose}
      >
        <Close className="dark:text-neutral-0 text-neutral-900" />
      </button>

      <div className="flex flex-col gap-2">
        <h3 className="text-preset-1 dark:text-neutral-0 text-neutral-900">
          Add a Bookmark
        </h3>
        <p className="text-preset-4-medium text-neutral-800 dark:text-neutral-100">
          Save a link with details to keep your collection organized.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-preset-4 dark:text-neutral-0 flex gap-0.5 text-neutral-900"
          htmlFor="title"
        >
          Title
          <span className="text-preset-sm text-teal-700 dark:text-neutral-100">
            *
          </span>
        </label>
        <input
          className="text-preset-4-medium text-input-shadow dark:text-neutral-0 rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
          id="title"
          type="text"
          aria-invalid={Boolean(errors.title)}
          {...register('title')}
        />
        {errors.title?.message && (
          <span className="text-preset-5 text-red-600">
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-preset-4 dark:text-neutral-0 flex gap-0.5 text-neutral-900"
          htmlFor="description"
        >
          Description
          <span className="text-preset-sm text-teal-700 dark:text-neutral-100">
            *
          </span>
        </label>
        <textarea
          className="text-preset-4-medium dark:text-neutral-0 max-h-60 min-h-22.5 resize-y rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
          id="description"
          aria-invalid={Boolean(errors.description)}
          maxLength={BOOKMARK_DESCRIPTION_MAX_LENGTH}
          {...register('description')}
        />
        {errors.description?.message && (
          <span className="text-preset-5 text-red-600">
            {errors.description.message}
          </span>
        )}

        <span className="text-preset-5 ml-auto text-neutral-800 dark:text-neutral-100">
          {descriptionLength}/{BOOKMARK_DESCRIPTION_MAX_LENGTH}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-preset-4 dark:text-neutral-0 flex gap-0.5 text-neutral-900"
          htmlFor="url"
        >
          Website URL
          <span className="text-preset-sm text-teal-700 dark:text-neutral-100">
            *
          </span>
        </label>
        <input
          className="text-preset-4-medium text-input-shadow dark:text-neutral-0 rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
          id="url"
          type="url"
          aria-invalid={Boolean(errors.url)}
          {...register('url')}
        />
        {errors.url?.message && (
          <span className="text-preset-5 text-red-600">
            {errors.url.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-preset-4 dark:text-neutral-0 flex gap-0.5 text-neutral-900"
          htmlFor="tags"
        >
          Tags
          <span className="text-preset-sm text-teal-700 dark:text-neutral-100">
            *
          </span>
        </label>
        <input
          className="text-preset-4-medium text-input-shadow dark:text-neutral-0 rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
          id="tags"
          type="text"
          placeholder="e.g. design, learning, tools"
          aria-invalid={Boolean(errors.tags)}
          {...register('tags')}
        />
        {errors.tags?.message && (
          <span className="text-preset-5 text-red-600">
            {errors.tags.message}
          </span>
        )}
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          className="bg-neutral-0 text-preset-3 w-full cursor-pointer rounded-lg border border-neutral-400 p-3 text-neutral-900 md:max-w-[95px]"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="text-preset-3 text-neutral-0 button-shadow w-full cursor-pointer rounded-lg border border-transparent bg-teal-700 p-3 md:max-w-[145px]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Add Bookmark'}
        </button>
      </div>
    </form>
  )
}
