'use client'

import { Close } from '../icons'

export const BookmarkForm = () => {
  return (
    <form className="bg-neutral-0 relative flex w-full max-w-[500px] flex-col gap-8 rounded-2xl border border-transparent px-5 py-6 dark:border-neutral-500 dark:bg-neutral-800">
      <button
        className="absolute top-5 right-5 cursor-pointer rounded-lg border border-neutral-400 p-1.5"
        type="button"
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
          name="title"
        />
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
          name="description"
        />

        <span className="text-preset-5 ml-auto text-neutral-800 dark:text-neutral-100">
          0/280
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-preset-4 dark:text-neutral-0 flex gap-0.5 text-neutral-900"
          htmlFor="url"
        >
          Website URL{' '}
          <span className="text-preset-sm text-teal-700 dark:text-neutral-100">
            *
          </span>
        </label>
        <input
          className="text-preset-4-medium text-input-shadow dark:text-neutral-0 rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
          id="url"
          type="url"
          name="url"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-preset-4 dark:text-neutral-0 flex gap-0.5 text-neutral-900"
          htmlFor="tags"
        >
          Tags{' '}
          <span className="text-preset-sm text-teal-700 dark:text-neutral-100">
            *
          </span>
        </label>
        <input
          className="text-preset-4-medium text-input-shadow dark:text-neutral-0 rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
          id="tags"
          type="text"
          name="tags"
          placeholder="e.g. design, learning, tools"
        />
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          className="bg-neutral-0 text-preset-3 w-full cursor-pointer rounded-lg border border-neutral-400 p-3 text-neutral-900 md:max-w-[95px]"
          type="button"
        >
          Cancel
        </button>
        <button
          className="text-preset-3 text-neutral-0 button-shadow w-full cursor-pointer rounded-lg border border-transparent bg-teal-700 p-3 md:max-w-[145px]"
          type="submit"
        >
          Add Bookmark
        </button>
      </div>
    </form>
  )
}
