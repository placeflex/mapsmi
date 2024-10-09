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
      <span
        className={`flex items-center gap-[1rem] text-bodySmall font-bold  ${textColor}`}
      >
        Maps <LogoIcon width={width} fill={fill} />{" "}
        <span>
          Mi<span className="opacity-[.5]">ngle</span>
        </span>
      </span>
    </Link>
  );
};
