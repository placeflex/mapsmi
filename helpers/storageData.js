import { productsVariations } from "@/constants/constants";

import { isEqual } from "lodash";

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

export const setToken = jwtToken => {
  localStorage.setItem("token", jwtToken);
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};

export const updateUserCartStorage = async cartItem => {
  if (localStorage.getItem("cart-storage")) {
    const cartData = JSON.parse(localStorage.getItem("cart-storage"));

    const res = await compareAndAdd(cartItem);

    if (Array.isArray(res)) {
      console.log("ARRAY");
      const updateCart = JSON.stringify(res);
      localStorage.setItem("cart-storage", updateCart);
      return {
        value: "added",
      };
    } else {
      const index = cartData.findIndex(obj => obj.uuid == cartItem.uuid);

      if (index !== -1) {
        const objAfterUpdate = {
          ...res,
          quantity: cartData[index].quantity + 1,
        };

        cartData.splice(index, 1, objAfterUpdate);

        const updateCart = JSON.stringify(cartData);
        localStorage.setItem("cart-storage", updateCart);

        return {
          value: "updated-quantity",
        };
      } else {
        return {
          value: "added",
        };
      }
    }
  }
};

const compareAndAdd = async newObj => {
  const cartData = JSON.parse(localStorage.getItem("cart-storage"));
  for (let obj of cartData) {
    if (isEqual(obj, newObj)) {
      console.log("EQUAL LAST");
      return newObj;
    }
  }

  cartData.push({ ...newObj, quantity: 1 });

  return cartData;
};

export const updateCartItem = async item => {
  const cartData = JSON.parse(localStorage.getItem("cart-storage"));

  // if (!cartData.length) {
  //   const newCartItem = [item];
  //   const updateCart = JSON.stringify(newCartItem);
  //   localStorage.setItem("cart-storage", updateCart);
  //   return updateCart;
  // }

  for (let i = cartData.length - 1; i >= 0; i--) {
    const obj = cartData[i];
    if (obj.uuid === item.uuid) {
      const newCartItem = { ...obj, ...item };
      cartData.splice(i, 1, newCartItem);
      const updateCart = JSON.stringify(cartData);
      localStorage.setItem("cart-storage", updateCart);
      return updateCart;
    }
  }

  return cartData;
};

// export const updateCartItem = item => {
//   const cartData = JSON.parse(localStorage.getItem("cart-storage"));

//   return cartData.map((obj, idx) => {
//     if (obj.uuid === item.uuid) {
//       const newCartItem = { ...obj, ...item };
//       cartData.splice(idx, 1, newCartItem);
//       const updateCart = JSON.stringify(cartData);
//       localStorage.setItem("cart-storage", updateCart);
//     }
//     return obj;
//   });
// };

export const saveCartStorage = async items => {
  return new Promise((resolve, reject) => {
    try {
      const newCart = JSON.stringify(items);
      localStorage.setItem("cart-storage", newCart);
      resolve(newCart);
    } catch (error) {
      reject(error);
    }
  });
};

export const getCartStorage = async () => {
  const cartStorage = localStorage.getItem("cart-storage");
  const cartItems = JSON.parse(cartStorage);
  return cartItems;
};
