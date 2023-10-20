import type { AppProps } from "next/app";
import type { Metadata } from "next";
import { Provider } from "react-redux";
import store from "@/redux/store";

import "@/styles/tailwind.css";
import "@/styles/globals.scss";

// fonts
import { main_font, dancing, alexbrush } from "@/constants/fonts";

export const metadata: Metadata = {
  title: "Splash Paper",
  description: "Splash Paper",
};

// modals
import { ProductVariations } from "@/components/Modals/ProductVariations";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${main_font.style.fontFamily};
        }
      `}</style>
      <div
        className={`root ${alexbrush.variable} ${dancing.variable} ${main_font.variable} font-sans`}
      >
        <Provider store={store}>
          <Component {...pageProps} />
          <ProductVariations />
        </Provider>
      </div>
    </>
  );
}
