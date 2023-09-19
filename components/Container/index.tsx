export const Container = ({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`container max-w-full ${className}`} {...props}>
      {children}
    </div>
  );
};
