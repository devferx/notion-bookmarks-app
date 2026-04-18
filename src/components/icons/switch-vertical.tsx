import type { IconProps } from './icon-props.type'

export const SwitchVertical = ({ size = 20, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M14.1667 3.33325V16.6666M14.1667 16.6666L10.8333 13.3333M14.1667 16.6666L17.5 13.3333M5.83333 16.6666V3.33325M5.83333 3.33325L2.5 6.66659M5.83333 3.33325L9.16667 6.66659"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
