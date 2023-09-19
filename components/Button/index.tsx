interface Props {
  href?: string;
  children?: React.ReactNode;
  classNames?: string;
  props?: any;
}

export const Button = ({
  href,
  children,
  classNames = "",
  ...props
}: Props) => {
  let classes = `inline-block py-5 px-12 text-xs text-white bg-black hover:bg-gray-700 rounded-xl font-normal ${classNames}`;

  return href ? (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  ) : (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
};
