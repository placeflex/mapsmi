import Link from "next/link";

import LogoIcon from "@/public/logo.svg";

interface Props {
  fill?: string;
  className?: string;
  textColor?: string;
  width?: number;
}

export const Logo = ({
  className = "",
  fill,
  textColor,
  width = 30,
  ...props
}: Props) => {
  return (
    <Link href="/" className={`flex items-center ${className}`} {...props}>
      <LogoIcon width={width} fill={fill} />

      <span
        className={`ml-3 text-bodySmall font-bold tracking-[0.4rem] uppercase ${textColor}`}
      >
        MapsMingle
      </span>
    </Link>
  );
};
