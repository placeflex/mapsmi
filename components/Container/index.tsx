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
      className={`container w-full mx-auto px-[1.5rem] lg:px-[2rem] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
