import type { AppProps } from "next/app";
import type { Metadata } from "next";

import "@/styles/globals.scss";

import { Montserrat, Dancing_Script, Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "600", "800"],
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Splash Paper",
  description: "Splash Paper",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`root ${dancing.variable} ${raleway.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
