import { productsVariations } from "@/constants/constants";

export const storagePoster = ({ profileStore = false, layout, productId }) => {
  const product = productsVariations[productId];

  if (localStorage.getItem(product)) {
    const getPoster = JSON.parse(localStorage.getItem(product));

    const poster = JSON.stringify({
      ...getPoster,
      ...layout,
    });

    return localStorage.setItem(product, poster);
  }

  const posterData = JSON.stringify(layout);

  localStorage.setItem(product, posterData);
};

export const getStoragePoster = () => {
  const storage = JSON.parse(localStorage.getItem("lineart-storage"));

  return storage;
};

export const setToken = jwtToken => {
  localStorage.setItem("token", jwtToken);
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};
