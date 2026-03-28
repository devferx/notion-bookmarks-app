import { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & {
  size?: number
}

export const Close = ({ size = 20, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    width={size}
    height={size}
    {...props}
  >
    <path
      d="M15 5L5 15M5 5L15 15"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
