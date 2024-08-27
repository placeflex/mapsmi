import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Link from "next/link";

// apis
import { api } from "@/axios";

// components
import { Container } from "@/components/Container";
import { Loader } from "@/components/Loader";

// stores
import { useDispatch } from "react-redux";
import { handleGetPopularProjects } from "@/redux/popular-wallarts";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { storagePoster } from "@/helpers/storageData";

import {
  initLayout,
  handleChangeStyles,
  handleChangeAttributes,
  handleChangeFrame,
} from "@/redux/layout";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const key = Object.keys(router.query);
    const value = Object.values(router.query);
    titleFormatted();

    if (key.length > 0) {
      api
        .get(`/popular-wallarts?${key}=${value}`)
        .then((data: any) => {
          dispatch(handleGetPopularProjects(data.data));
          setIsLoading(false);
        })
        .catch(({ response }) => {
          setIsLoading(false);
        });
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
    <Layout
      headerProps={{ classNames: "bg-secondary" }}
      fixed={true}
      scroll={true}
    >
      <Container>
        <div className="py-[10rem]">
          <h1 className="text-h3 font-bold mb-[1rem]">{pageTitle}</h1>
          <h2 className="text-caption mb-[3rem]">
            Custom prints and stunning {pageTitle} for your home or office.
          </h2>

          <div className="flex flex-wrap mx-[-2rem]">
            {isLoading ? (
              <div className="w-full text-center flex justify-center align-center">
                {isLoading ? <Loader width={50} height={50} /> : null}
              </div>
            ) : null}
            {!wallarts.length && !isLoading ? (
              <div className="text-center w-full">
                <h3 className="text-bodyBold font-bold">Empty</h3>
                <p className="text-caption">message =(</p>
              </div>
            ) : null}
            {wallarts?.map(
              ({
                type,
                updatedAt,
                createdAt,
                price,
                _id,
                __v,
                ...props
              }: any) => {
                return (
                  <div key={props.id} className="w-[20%]">
                    <div
                      key={props.id}
                      className="flex flex-col m-[1rem] cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("map-storage");
                        storagePoster({
                          productId: props.productId,
                          layout: {
                            ...props,
                          },
                        });
                        dispatch(initLayout(props.productId));
                        router.push({
                          pathname: "/editor",
                          query: {
                            product_id: props.productId,
                            from: "pupular-wallarts",
                            fields: JSON.stringify(props),
                          },
                        });
                      }}
                    >
                      <div className="w-full pt-[120%] relative bg-secondary">
                        <div className="absolute top-0 left-0 h-full w-full">
                          <div className="w-full h-full p-[10%] group">
                            <div className="w-full h-full relative scale-[0.9] group-hover:scale-[1] transition-all">
                              <Image
                                src={props.path}
                                alt={props.name}
                                objectFit="contain"
                                quality={100}
                                layout="fill"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-[2rem] px-[2rem] w-full">
                        <h2 className="capitalize text-center mx-auto text-caption w-[100%] truncate">
                          {props.name}
                        </h2>

                        {price && (
                          <h2 className="text-center mx-auto text-captionSmall mt-[1rem] text-nowrap">
                            As Designed{" "}
                            <span className="font-bold text-blueGrey">
                              {Number(price).toFixed(2)} €
                            </span>
                          </h2>
                        )}
                      </div>
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
