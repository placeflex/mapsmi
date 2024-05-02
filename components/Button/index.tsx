import Link from "next/link";

interface Props {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
  variant?: "outlined" | "contained";
  color?: "primary" | "secondary";
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
  ...props
}: Props) => {
  let classes = `inline-block py-7 px-14 rounded-sm font-normal ${
    color === "secondary" ? "bg-secondButton text-text" : "bg-button text-white"
  } ${variant === "outlined" && "bg-transparent border-[0.2rem]"} ${className}`;

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
