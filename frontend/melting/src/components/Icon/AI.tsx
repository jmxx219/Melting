import { SVGIconProps } from '@/types/globalType'

export default function AI({
  width = 32,
  height = 32,
  fill = '#A5A5A5',
}: SVGIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 3.33333C0 1.49239 1.49239 0 3.33333 0H16.6667C18.5076 0 20 1.49239 20 3.33333V16.6667C20 18.5076 18.5076 20 16.6667 20H3.33333C1.49239 20 0 18.5076 0 16.6667V3.33333ZM3.33333 1.33333C2.22876 1.33333 1.33333 2.22876 1.33333 3.33333V16.6667C1.33333 17.7712 2.22876 18.6667 3.33333 18.6667H16.6667C17.7712 18.6667 18.6667 17.7712 18.6667 16.6667V3.33333C18.6667 2.22876 17.7712 1.33333 16.6667 1.33333H3.33333Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.92924 7.03515C7.81631 6.80929 7.58551 6.66663 7.33298 6.66663C7.08047 6.66663 6.84963 6.80929 6.73671 7.03515L4.07004 12.3685C3.90538 12.6978 4.03886 13.0982 4.36818 13.2629C4.6975 13.4276 5.09795 13.2941 5.2626 12.9648L5.74502 12H8.92098L9.40338 12.9648C9.56805 13.2941 9.96844 13.4276 10.2978 13.2629C10.6271 13.0982 10.7606 12.6978 10.5959 12.3685L7.92924 7.03515ZM8.25431 10.6666L7.33298 8.82396L6.41168 10.6666H8.25431Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0002 6.66663C14.3683 6.66663 14.6668 6.96511 14.6668 7.33329V12.6666C14.6668 13.0348 14.3683 13.3333 14.0002 13.3333C13.632 13.3333 13.3335 13.0348 13.3335 12.6666V7.33329C13.3335 6.96511 13.632 6.66663 14.0002 6.66663Z"
        fill={fill}
      />
    </svg>
  )
}