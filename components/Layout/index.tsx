import React from "react";

// components
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const Layout = ({ children, className }: Props) => {
  return (
    <div className={`layout`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
