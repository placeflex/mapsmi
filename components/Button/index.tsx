import Link from "next/link";
import clsx from "clsx";

interface Props {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
  variant?: "outlined" | "contained";
  color?: "primary" | "secondary";
  rounede?: string;
}

// import styles from "./Button.module.scss";

export const Button = ({
  href,
  children,
  className = "",
  onClick,
  type = "button",
  variant = "contained",
  color = "secondary",
  rounede,
  ...props
}: Props) => {
  const colorLocal =
    color === "secondary"
      ? "bg-secondButton text-text"
      : "bg-[rgba(118,125,106,1)] hover:bg-[rgba(118,125,106,0.8)] text-primary";

  const variantLocal =
    variant === "outlined" && "bg-transparent border-[0.2rem]";

  const borderRadius = rounede && "rounded-md";

  let classes = clsx(
    `inline-block py-[1rem] px-[4rem] font-normal font-semibold`,
    colorLocal,
    variantLocal,
    borderRadius,
    className
  );

  return href ? (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  ) : (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
