import React from "react";
import clsx from "clsx";

// components
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

type Props = {
  children?: React.ReactNode;
  className?: string;
  fixed?: boolean;
  scroll?: boolean;
  headerProps?: any;
  col?: boolean;
};

export const Layout = ({
  children,
  fixed = false,
  className,
  scroll,
  headerProps,
  col,
}: Props) => {
  const classes = col
    ? "scroll overflow-y-auto overflow-x-hidden h-[100vh] flex flex-col"
    : "scroll overflow-y-auto overflow-x-hidden h-[100vh]";

  return (
    <>
      {scroll ? (
        <div className={classes}>
          <Header isFixed={fixed} {...headerProps} />
          <main className={className}>{children}</main>

          <Footer className={clsx(col ? "mt-auto" : null)} />
        </div>
      ) : (
        <>
          <Header isFixed={fixed} />
          <main className={className}>{children}</main>
          <Footer />
        </>
      )}
    </>
  );
};
