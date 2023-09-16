import React from "react";

// components
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

type Props = {
  children: React.ReactNode;
  className: string;
};

export const RootLayout = ({ children, className }: Props) => {
  return (
    <div className={className}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
