import { useRouter } from "next/router";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import type { Metadata } from "next";

// apis
import { api } from "@/axios";

// stores
import { Provider } from "react-redux";
import store from "@/redux/store";
import { useDispatch } from "react-redux";
import { handleSaveUser, handleLogout } from "@/redux/user";

// fonts
import { main_font, dancing, alexbrush } from "@/constants/fonts";

// styles
import "@/styles/tailwind.css";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Splash Paper",
  description: "Splash Paper",
};

// modals
import { ProductVariations } from "@/components/Modals/ProductVariations";
import { Register } from "@/components/Modals/Register";
import { Login } from "@/components/Modals/Login";

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !router.pathname.includes("/profile")) {
      try {
        api
          .get("/me")
          .then(user => {
            dispatch(handleSaveUser(user));
          })
          .catch(({ response }) => {
            dispatch(handleLogout());
            console.log("GET ME ERROR:", response.data.error);
          });
      } catch (error) {
        console.log("GET ME ERROR:", error);
      }
    }
  }, []);

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
          <Register />
          <Login />
        </Provider>
      </div>
    </>
  );
}

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <CustomApp Component={Component} pageProps={pageProps} router={router} />
    </Provider>
  );
}

export default MyApp;
