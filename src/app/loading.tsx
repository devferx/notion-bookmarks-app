export default function Loading() {
  return (
    <main className="flex min-h-screen w-full bg-neutral-100 dark:bg-neutral-900">
      {/* Sidebar skeleton */}
      <aside className="bg-neutral-0 hidden w-75 flex-col gap-4 border-r border-neutral-300 dark:border-neutral-500 dark:bg-neutral-800 lg:flex">
        <div className="px-5 pt-5 pb-2.5">
          <div className="h-5 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        </div>

        <nav className="flex flex-col gap-1 px-4">
          <div className="h-10 w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-10 w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700" />
        </nav>

        <div className="flex-1 px-4 pb-5">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="h-4 w-12 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-4 w-10 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
          </div>

          <div className="flex flex-col gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2.5"
              >
                <div className="h-4 w-4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-4 flex-1 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content skeleton */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-neutral-0 sticky top-0 z-30 flex w-full items-center justify-between gap-2.5 border-b border-neutral-300 px-4 py-3 dark:border-neutral-500 dark:bg-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700 lg:hidden" />
            <div className="h-10 w-80 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          </div>

          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
          </div>
        </header>

        <section className="px-4 pt-6 pb-16 md:px-8 md:pt-8">
          <div className="h-8 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-neutral-0 card-shadow grid gap-4 rounded-[10px] p-4 dark:bg-neutral-800"
              >
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                  <div className="grid flex-1 gap-2">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                  </div>
                </div>

                <div className="h-4 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />

                <div className="flex gap-3">
                  <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-4 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
