import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & {
  size?: number
}

export const Sun = ({ size = 16, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    fill="none"
    width={size}
    height={size}
    {...props}
  >
    <g clipPath="url(#clip0_682_887)">
      <path
        d="M7.0002 1.16675V2.33341M7.0002 11.6667V12.8334M2.33354 7.00008H1.16687M3.68344 3.68332L2.85848 2.85836M10.317 3.68332L11.1419 2.85836M3.68344 10.3192L2.85848 11.1442M10.317 10.3192L11.1419 11.1442M12.8335 7.00008H11.6669M9.91687 7.00008C9.91687 8.61091 8.61103 9.91675 7.0002 9.91675C5.38937 9.91675 4.08354 8.61091 4.08354 7.00008C4.08354 5.38925 5.38937 4.08341 7.0002 4.08341C8.61103 4.08341 9.91687 5.38925 9.91687 7.00008Z"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_682_887">
        <rect width={14} height={14} fill="white" />
      </clipPath>
    </defs>
  </svg>
)
