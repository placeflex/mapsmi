import Link from "next/link";

import LogoIcon from "@/public/logo.svg";

interface Props {
  fill?: string;
  className?: string;
  textColor?: string;
}

export const Logo = ({ className = "", fill, textColor, ...props }: Props) => {
  return (
    <Link href="/" className={`flex items-center ${className}`} {...props}>
      <LogoIcon width={30} fill={fill} />

      <span className={`ml-3 text-bodySmall ${textColor}`}>S P L A S H S M A S H</span>
    </Link>
  );
};
