import Link from "next/link";

interface Props {
  href?: string;
  children?: React.ReactNode;
  classNames?: string;
  props?: any;
  onClick?: () => void;
}

export const Button = ({
  href,
  children,
  classNames = "",
  onClick,
  ...props
}: Props) => {
  let classes = `inline-block py-5 px-12 text-xs text-white bg-black hover:bg-gray-700 rounded-xl font-normal ${classNames}`;

  return href ? (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  ) : (
    <button type="button" className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
