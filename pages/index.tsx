import { useEffect } from "react";

import { useRouter } from "next/router";

// components
import { Layout } from "@/components/Layout/";

// modules
import { Banner } from "@/modules/Home/Banner";
import { Products } from "@/modules/Home/Products";
import { OurPosters } from "@/modules/Home/OurPosters";

// stores
import { useDispatch } from "react-redux";
import { handleShowResetPasswordModal } from "@/redux/modals";

// apis
import { api } from "@/axios";

// helpers
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.query.confirmToken) {
      api
        .get(`auth/register?confirmToken=${router.query.confirmToken}`)
        .then(({ message }: any) => {
          router.push("/");
          toast.success(message);
        })
        .catch(({ error }) => {
          toast.error(error);
        });
    }

    if (router.query.resetPasswordToken) {
      dispatch(handleShowResetPasswordModal());
    }
  }, [router.query]);

  return (
    <Layout>
      <Banner />
      {/* <Products /> */}
      {/* <OurPosters /> */}
    </Layout>
  );
}
