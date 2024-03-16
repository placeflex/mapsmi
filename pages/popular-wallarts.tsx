import { useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

// apis
import { api } from "@/axios";

import { useDispatch } from "react-redux";

import { handleGetPopularProjects } from "@/redux/popular-wallarts";

import { useTypedSelector, AppDispatch } from "@/redux/store";

import { storagePoster } from "@/helpers/storageData";

// components
import { Layout } from "@/components/Layout/";

// modules

export default function PopularWallarts() {
  const dispatch = useDispatch();
  const router = useRouter();
  const wallarts = useTypedSelector(
    ({ popularWallarts }) => popularWallarts.wallarts
  );

  useEffect(() => {
    api
      .get("/popular-wallarts")
      .then((data: any) => {
        dispatch(handleGetPopularProjects(data.data));
      })
      .catch(({ response }) => {});
  }, []);

  return (
    <Layout>
      <div className="flex">
        {wallarts?.map(
          ({ path, type, updatedAt, createdAt, ...props }: any) => {
            return (
              <div
                key={props.id}
                className="w-[15.33%]"
                onClick={() => {
                  storagePoster({
                    productId: props.productId,
                    layout: props,
                  });

                  router.push({
                    pathname: "/editor",
                    query: {
                      product_id: props.productId,
                    },
                  });
                }}
              >
                <img src={path} alt="" />
                <h2>{props.title}</h2>
                <p>{props.description}</p>
              </div>
            );
          }
        )}
      </div>
    </Layout>
  );
}
