import { useEffect } from "react";

import { useRouter } from "next/router";

// components
import { Layout } from "@/components/Layout/";

// modules
import { Banner } from "@/modules/Home/Banner";
import { Products } from "@/modules/Home/Products";
import { OurPosters } from "@/modules/Home/OurPosters";

// apis
import { api } from "@/axios";

// helpers
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.confirmToken) {
      api
        .get(`/register?confirmToken=${router.query.confirmToken}`)
        .then(({ data }) => {
          router.push("/");
          toast.success(data.message);
        })
        .catch(({ response }) => {
          toast.error(response.data.error);
        });
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
