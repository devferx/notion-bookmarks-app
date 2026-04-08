'use client'

import type { ReactNode } from 'react'
import { startTransition, useOptimistic } from 'react'
import { toast } from 'sonner'

type RunOptimisticActionOptions<TState extends { isPending: boolean }> = {
  action: () => Promise<void>
  errorIcon?: ReactNode
  errorMessage?: string
  onError?: () => void
  onFinally?: () => void
  optimisticUpdate?: Partial<TState>
  showDefaultErrorToast?: boolean
}

type UseOptimisticActionOptions = {
  defaultErrorIcon?: ReactNode
  defaultErrorMessage?: string
}

export function useOptimisticAction<TState extends { isPending: boolean }>(
  initialState: TState,
  {
    defaultErrorIcon,
    defaultErrorMessage = 'Something went wrong. Please try again.',
  }: UseOptimisticActionOptions = {},
) {
  const [state, setState] = useOptimistic(
    initialState,
    (current: TState, nextState: Partial<TState>) => ({
      ...current,
      ...nextState,
    }),
  )

  const runOptimisticAction = async ({
    action,
    errorIcon,
    errorMessage,
    onError,
    onFinally,
    optimisticUpdate,
    showDefaultErrorToast = true,
  }: RunOptimisticActionOptions<TState>) => {
    const previousState = state

    startTransition(() => {
      setState({
        ...optimisticUpdate,
        isPending: true,
      } as Partial<TState>)
    })

    try {
      await action()
    } catch {
      startTransition(() => {
        setState(previousState)
      })

      if (showDefaultErrorToast) {
        toast(errorMessage ?? defaultErrorMessage, {
          icon: errorIcon ?? defaultErrorIcon,
          classNames: {
            title: 'text-preset-4-medium text-neutral-900',
          },
        })
      }

      onError?.()
    } finally {
      onFinally?.()
    }
  }

  return {
    optimisticState: state,
    runOptimisticAction,
    setOptimisticState: setState,
  }
}
