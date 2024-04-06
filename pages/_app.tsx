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

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isOpenProjectSettings = useTypedSelector(
    ({ modals }) => modals.isOpenProjectAdminSettings
  );
  const markersPanel = useTypedSelector(({ modals }) => modals.markersPanel);

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
      <div
        className={`root ${alexbrush.variable} ${dancing.variable} ${main_font.variable} font-sans overflow-y-auto overflow-x-hidden h-[100vh]`}
      >
        <Component {...pageProps} />
        <ProductVariations />
        <Register />
        <Login />
        <ForgotPassword />
        <ResetPassword />

        <SidePanelLayout isOpen={isOpenProjectSettings} bgClose={true}>
          <ProjectAdminSettings />
        </SidePanelLayout>
        <SidePanelLayout isOpen={markersPanel.state} bgClose={true}>
          <Markers />
        </SidePanelLayout>
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
