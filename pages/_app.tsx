import { useRouter } from "next/router";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import type { Metadata } from "next";
import Head from "next/head";

// apis
import { api } from "@/axios";

// stores
import { Provider } from "react-redux";
import store from "@/redux/store";
import { useDispatch } from "react-redux";
import { handleSaveUser, handleLogout } from "@/redux/user";
import { handleShowLoginModal } from "@/redux/modals";
import { useTypedSelector } from "@/redux/store";

// fonts
import { main_font, dancing, alexbrush } from "@/constants/fonts";

// helpers
import { ToastContainer, toast } from "react-toastify";

// styles
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Splash Paper",
  description: "Splash Paper",
};

// modals
import { ProductVariations } from "@/components/Modals/ProductVariations";
import { Register } from "@/components/Modals/Register";
import { Login } from "@/components/Modals/Login";
import { ForgotPassword } from "@/components/Modals/ForgotPassword";
import { ResetPassword } from "@/components/Modals/ResetPassword";
import { ProjectAdminSettings } from "@/components/Modals/ProjectAdminSettings";
import { Markers } from "@/components/Modals/Markers";
import { SidePanelLayout } from "@/components/SidePanel/layout";
import { Cart } from "@/components/Modals/Cart";

// TODO: FOR v@
// import { SelectLocationOnMap } from "@/components/Modals/SelectLocationOnMap";

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isOpenProjectSettings = useTypedSelector(
    ({ modals }) => modals.isOpenProjectAdminSettings
  );
  const markersPanel = useTypedSelector(({ modals }) => modals.markersPanel);

  const cartPanel = useTypedSelector(({ modals }) => modals.isOpenCartPanel);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (router.query.admin == "login" && !token) {
      dispatch(handleShowLoginModal());
    }
  }, [router.query.admin]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const resetPasswordToken = localStorage.getItem("token");

    if (token) {
      try {
        api
          .get("/me")
          .then(user => {
            console.log("user", user);
            dispatch(handleSaveUser(user));
          })
          .catch(({ response }) => {
            // dispatch(handleLogout());
            // toast.error(response?.data?.error);
          });
      } catch (error) {
        throw new Error(`GET ME ERROR: ${error}`);
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
      <Head>
        <title>🥇 MapsMingle: Design Your Own Custom Maps and Posters</title>
        <meta
          name="description"
          content="Design a personal Custom Map Poster, Star Map Poster and more, with our easy to use design tools ✔︎ Printed to order ✔︎ Free worldwide shipping"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          href="https://unpkg.com/mapbox-gl@2.5.0/dist/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div
        className={`root ${alexbrush.variable} ${dancing.variable} ${main_font.variable} font-sans`}
      >
        <Component {...pageProps} />
        <ProductVariations />
        <Register />
        <Login />
        <ForgotPassword />
        <ResetPassword />

        <SidePanelLayout
          isOpen={isOpenProjectSettings}
          bgClose={true}
          className="w-full lg:w-[55rem]"
        >
          <ProjectAdminSettings />
        </SidePanelLayout>
        <SidePanelLayout
          isOpen={markersPanel.state}
          bgClose={true}
          className="w-full lg:w-[55rem]"
        >
          <Markers />
        </SidePanelLayout>
        <SidePanelLayout
          isOpen={cartPanel}
          bgClose={true}
          className="w-full lg:w-[55rem]"
        >
          <Cart />
        </SidePanelLayout>

        {/* TODO: FOR v2 */}
        {/* <SidePanelLayout isOpen={true} bgClose={false}>
          <SelectLocationOnMap />
        </SidePanelLayout> */}
        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          closeOnClick
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          theme="dark"
        />
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
