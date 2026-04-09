import type { IconProps } from './icon-props.type'

export const Refresh = ({ size = 16, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M1.33325 6.66667C1.33325 6.66667 2.66991 4.84548 3.75581 3.75883C4.84171 2.67218 6.34232 2 7.99992 2C11.3136 2 13.9999 4.68629 13.9999 8C13.9999 11.3137 11.3136 14 7.99992 14C5.26452 14 2.95666 12.1695 2.23443 9.66667M1.33325 6.66667V2.66667M1.33325 6.66667H5.33325"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
