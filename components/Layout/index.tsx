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
};

export const Layout = ({
  children,
  fixed = false,
  className,
  scroll,
  headerProps,
}: Props) => {
  return (
    <>
      {scroll ? (
        <div className="scroll overflow-y-auto overflow-x-hidden h-[100vh]">
          <Header isFixed={fixed} {...headerProps} />
          <main className={className}>{children}</main>
          <Footer />
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
