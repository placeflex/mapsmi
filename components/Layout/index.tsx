import React from "react";
import classNames from "classnames";

// components
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

type Props = {
  children?: React.ReactNode;
  className?: string;
  fixed?: boolean;
};

export const Layout = ({ children, fixed = false, className }: Props) => {
  return (
    <>
      <Header isFixed={fixed} />
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
};
