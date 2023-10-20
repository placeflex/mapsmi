import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productModal: false,
};

const modals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    haandleShowProductModal(state) {
      state.productModal = true;
    },

    handleCloseModals(state) {
      state.productModal = false;
    },
  },
});

export const { haandleShowProductModal, handleCloseModals } = modals.actions;

export default modals.reducer;
