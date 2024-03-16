export const Container = ({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`container max-w-[153.6rem] w-full mx-auto px-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
