import Link from "next/link";

interface Props {
  href?: string;
  children?: React.ReactNode;
  classNames?: string;
  onClick?: () => void;
  type: "button" | "reset" | "submit";
}

// import styles from "./Button.module.scss";

export const Button = ({
  href,
  children,
  classNames = "",
  onClick,
  type = "button",
  ...props
}: Props) => {
  let classes = `inline-block py-3 px-8 text-xs text-white bg-button rounded-sm font-normal ${classNames}`;

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
