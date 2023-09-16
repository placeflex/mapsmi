import type { AppProps } from "next/app";
import type { Metadata } from "next";

import "@/styles/styles.css";

import { Montserrat } from "next/font/google";

// components
import { RootLayout } from "@/components/Layout/";

const montserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Splash Paper",
  description: "Splash Paper",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RootLayout className={`${montserratFont.variable} font-sans`}>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}
