import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Link from "next/link";

// apis
import { api } from "@/axios";

// components
import { Container } from "@/components/Container";

// stores
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
  const [pageTitle, setPageTitle] = useState("");
  const wallarts = useTypedSelector(
    ({ popularWallarts }) => popularWallarts.wallarts
  );

  useEffect(() => {
    const key = Object.keys(router.query);
    const value = Object.values(router.query);
    titleFormatted();

    if (key.length > 0) {
      api
        .get(`/popular-wallarts?${key}=${value}`)
        .then((data: any) => {
          dispatch(handleGetPopularProjects(data.data));
        })
        .catch(({ response }) => {});
    }
  }, [router.query]);

  const titleFormatted = () => {
    const value = Object.values(router.query)[0];

    if (value) {
      const formattedValue = (value as string)
        ?.split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1));
      const formattedTitle = formattedValue.join(" ");

      setPageTitle(formattedTitle);
    }
  };

  return (
    <Layout className="bg-secondary" fixed={true} scroll={true}>
      <Container>
        <div className="py-[10rem]">
          <h1 className="text-h3 font-bold mb-[1rem]">{pageTitle}</h1>
          <h2 className="text-caption mb-[3rem]">
            Custom prints and stunning {pageTitle} for your home or office.
          </h2>

          <div className="flex flex-wrap mx-[-1rem]">
            {wallarts?.map(
              ({
                path,
                type,
                updatedAt,
                createdAt,
                price,
                _id,
                __v,
                ...props
              }: any) => {
                return (
                  <div
                    key={props.id}
                    className="w-[calc(100%/4-4rem)] m-[2rem] aspect-square"
                  >
                    <div
                      key={props.id}
                      className="flex jusify-center w-full relative cursor-pointer h-full"
                      onClick={() => {
                        storagePoster({
                          productId: props.productId,
                          layout: props,
                        });

                        // TODO: TIMEOUT BECAUSE NEED TIME FOR APPLY DATA IN LOCAL STORAGE
                        setTimeout(() => {
                          router.push({
                            pathname: "/editor",
                            query: {
                              product_id: props.productId,
                              from: "pupular-wallarts",
                            },
                          });
                        }, 100);
                      }}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={path}
                          alt={props.name}
                          objectFit="contain"
                          quality={50}
                          layout="fill"
                          // priority={true}
                          // width={400}
                          // height={400}
                        />
                      </div>
                    </div>

                    <div className="py-[2rem] px-[2rem]">
                      <h2 className="capitalize text-center mx-auto text-caption w-[100%] truncate">
                        {props.name}
                      </h2>
                      {price && (
                        <h2 className="text-center mx-auto text-captionSmall w-[50%] mt-[1rem] truncate">
                          As Designed{" "}
                          <span className="font-bold text-blueGrey">
                            {price} UAH
                          </span>
                        </h2>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}
