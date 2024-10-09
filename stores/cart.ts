import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// constants
import { productsVariations } from "@/constants/constants";

import { isEqual, isEmpty, omit } from "lodash";
import { useDispatch } from "react-redux";
// helpers
import { toast } from "react-toastify";
import {
  updateUserCartStorage,
  storagePoster,
  updateCartItem,
  saveCartStorage,
  getCartStorage,
} from "@/helpers/storageData";

// apis
import { api } from "@/axios";

const initialState = {
  cart: [],
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleGetCart(state: any) {
      const cartStorage = localStorage.getItem("cart-storage");

      if (cartStorage) {
        const cartItems = JSON.parse(cartStorage);

        if (cartItems?.length) {
          state.cart = cartItems;
        }
      } else {
        localStorage.setItem("cart-storage", JSON.stringify([]));
      }
    },

    handleDeleteItem(state: any, action: any) {
      const layout = action.payload;
      const cartStorage = localStorage.getItem("cart-storage");

      console.log("cartStorage", cartStorage);

      console.log("layout", layout);

      //   return;

      if (cartStorage) {
        const cartItems = JSON.parse(cartStorage);
        const newCart = cartItems.filter(
          (item: any) => item.path !== layout.path
        );

        state.cart = newCart;
        localStorage.setItem("cart-storage", JSON.stringify(newCart));

        const rq = api
          .patch("cart", layout)
          .then(async ({ data, message }: any) => {
            toast.success(message);
          })
          .catch(({ error }) => {});

        toast.promise(rq, {
          pending: "Project is deletiong from cart! Please wait few seconds.",
        });
      }
    },
  },
});

export const { handleGetCart, handleDeleteItem } = cart.actions;

export default cart.reducer;
