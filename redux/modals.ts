import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productModal: false,
  registerModal: false,
  loginModal: false,
};

const modals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    handleShowProductModal(state) {
      state.productModal = true;
    },
    handleShowRegisterModal(state) {
      state.registerModal = true;
    },
    handleShowLoginModal(state) {
      state.loginModal = true;
    },

    handleCloseModals(state) {
      state.productModal = false;
      state.registerModal = false;
      state.loginModal = false;
    },
  },
});

export const {
  handleShowProductModal,
  handleShowRegisterModal,
  handleShowLoginModal,
  handleCloseModals,
} = modals.actions;

export default modals.reducer;
