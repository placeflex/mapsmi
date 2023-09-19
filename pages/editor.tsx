import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

export default function Editor() {
  //   useEffect(() => {
  //     // Создание новой карты

  //     mapboxgl.accessToken =
  //       "pk.eyJ1IjoicGxhY2VmbGV4IiwiYSI6ImNsbW5kNDZ0NjB1b3gyanBnazYxZDIwbWEifQ.0KkybKwLELGqX0ntrhMaEg";
  //     const map = new mapboxgl.Map({
  //       container: "map-container", // ID контейнера для карты
  //       style: "mapbox://styles/placeflex/clmnexi3h01vt01qu79upeoi0", // Стиль карты (пример)
  //       center: [-74.5, 40], // Координаты центра карты
  //       zoom: 10, // Уровень масштабирования
  //     });

  //     map.on("load", () => {});

  //     // Очистка ресурсов при размонтировании компонента
  //     return () => map.remove();
  //   }, []);

  return (
    <h1>
      <div id="map-container" style={{ width: "100%", height: "400px" }}></div>
    </h1>
  );
}
