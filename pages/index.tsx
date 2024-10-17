import { useEffect } from "react";

import { useRouter } from "next/router";

// components
import { Layout } from "@/components/Layout/";

// modules
import { Banner } from "@/modules/Home/Banner";
import { OurBrand } from "@/modules/Home/OurBrand";
import { OurPosters } from "@/modules/Home/OurPosters";
import { NewProduct } from "@/modules/Home/NewProduct";
import { TopSellCategories } from "@/modules/Home/TopSellCategories";
import { TopSellLocations } from "@/modules/Home/TopSellLocations";
import { TopSellSports } from "@/modules/Home/TopSellSports";
import { Gifts } from "@/modules/Home/Gifts";
import { Discount } from "@/modules/Home/Discount";
// import { Products } from "@/modules/Home/Products";

// stores
import { useDispatch } from "react-redux";
// import { handleShowResetPasswordModal } from "@/stores/modals";

// apis
import { api } from "@/axios";

// helpers
import { toast } from "react-toastify";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Home(...props) {
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

    // if (router.query.resetPasswordToken) {
    //   dispatch(handleShowResetPasswordModal());
    // }
  }, [router.query]);

  return (
    <Layout fixed={true} scroll={true}>
      <Banner />
      {/* <Products /> */}

      <div className="sticky top-0 bg-primary">
        <OurPosters />
        <Discount />
        <TopSellCategories />
        <TopSellLocations />
        <TopSellSports />
        <Gifts />
      </div>

      {/* <OurBrand /> */}
      {/* <NewProduct /> */}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common", "home"])),
    },
  };
}
