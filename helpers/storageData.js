export const productsStorage = {
  0: "lineart-storage",
  1: "skymap-storage",
  2: "map-storage",
};

export const storagePoster = (data, productId) => {
  const product = productsStorage[productId];
  
  if (localStorage.getItem(product)) {
    const getPoster = JSON.parse(localStorage.getItem(product));

    const val = JSON.stringify({
      ...getPoster,
      ...data,
    });

    localStorage.setItem(product, val);

    return;
  }

  const posterData = JSON.stringify(data);

  localStorage.setItem(product, posterData);
};

export const getStoragePoster = () => {
  const storage = JSON.parse(localStorage.getItem("lineart-storage"));

  return storage;
};
