import { useEffect } from "react";

// components
import { Layout } from "@/components/Layout/";
import { Banner } from "@/modules/Home/Banner";
import { OurPosters } from "@/modules/Home/OurPosters";

import { api } from "@/axios";

// modals

export default function Home() {
  useEffect(() => {
    const response = api.get("/locations").then(res => {
      console.log("response", res);
    });
  }, []);

  return (
    <Layout>
      <Banner />
      {/* <OurPosters /> */}
    </Layout>
  );
}
