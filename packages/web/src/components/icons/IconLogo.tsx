import { useId, type SVGProps } from "react";



export function IconLogo(props: SVGProps<SVGSVGElement>) {
  const uid = useId();
  const gradientId = `logo-gradient-${uid}`;

  return (
    <svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0906 3.20925C12.9279 -0.536712 7.52104 -0.536707 5.35831 3.20925L4.36875 4.92322C4.88196 4.71595 5.44946 4.60008 6.0571 4.60008L14.9466 4.60008C15.2981 4.60008 15.6361 4.63885 15.958 4.71166L15.0906 3.20925ZM19.2361 10.3895C19.1382 10.7047 19.0028 11.0168 18.827 11.3212L14.3823 19.0197C14.2622 19.2277 14.1296 19.4211 13.9863 19.6001H14.8216C19.147 19.6001 21.8505 14.9177 19.6877 11.1717L19.2361 10.3895ZM7.01741 19.6001C6.87403 19.4211 6.74144 19.2277 6.62139 19.0197L2.17665 11.3212C1.87283 10.795 1.68944 10.2456 1.61232 9.69749L0.761177 11.1717C-1.40155 14.9177 1.30187 19.6001 5.62733 19.6001H7.01741Z"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="-10.2093"
          y1="9.98577"
          x2="8.92464"
          y2="30.364"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8955" />
          <stop offset="0.530854" stopColor="#C956A0" />
          <stop offset="0.999815" stopColor="#7245FA" />
        </linearGradient>
      </defs>
    </svg>
  );
}
