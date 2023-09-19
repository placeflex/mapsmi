import { useEffect } from "react";

import Image from "next/image";

// components
import { Layout } from "@/components/Layout/";
import { Banner } from "@/modules/Home/Banner";
import { OurPosters } from "@/modules/Home/OurPosters";

import { api } from "@/axios";

async function fetchData() {
  try {
    const response = await api.post("/example", {
      name: "Egor",
      value: "Safronov",
    }); // Замените на свой API маршрут
    console.log("Данные с сервера:", response);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

export default function Home() {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Banner />
      <OurPosters />
    </Layout>
  );
}
