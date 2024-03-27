import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productModal: false,
  registerModal: false,
  loginModal: false,
  forgotPassword: false,
  resetPassword: false,
  isOpenProjectAdminSettings: false,
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
    handleShowProjectSettingsModal(state) {
      state.isOpenProjectAdminSettings = true;
    },

    handleCloseModals(state) {
      state.productModal = false;
      state.registerModal = false;
      state.loginModal = false;
      state.forgotPassword = false;
      state.resetPassword = false;
      state.isOpenProjectAdminSettings = false;
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
  handleShowProjectSettingsModal,
} = modals.actions;

export default modals.reducer;
