import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productModal: false,
  registerModal: false,
  loginModal: false,
  forgotPassword: false,
  resetPassword: false,
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
    handleShowForgorPasswordModal(state) {
      state.forgotPassword = true;
    },
    handleShowResetPasswordModal(state) {
      state.resetPassword = true;
    },

    handleCloseModals(state) {
      state.productModal = false;
      state.registerModal = false;
      state.loginModal = false;
      state.forgotPassword = false;
      state.resetPassword = false;
    },
  },
});

export const {
  handleShowProductModal,
  handleShowRegisterModal,
  handleShowLoginModal,
  handleCloseModals,
  handleShowForgorPasswordModal,
  handleShowResetPasswordModal,
} = modals.actions;

export default modals.reducer;
