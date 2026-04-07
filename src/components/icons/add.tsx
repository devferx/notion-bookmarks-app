import type { IconProps } from './icon-props.type'

export const Add = ({ size = 20, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="M10.0003 4.16666V15.8333M4.16699 9.99999H15.8337"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
