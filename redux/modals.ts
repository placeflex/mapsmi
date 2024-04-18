import { createSlice } from "@reduxjs/toolkit";

interface IModals {
  productModal: boolean;
  registerModal: boolean;
  loginModal: boolean;
  forgotPassword: boolean;
  resetPassword: boolean;
  isOpenProjectAdminSettings: boolean;
  isOpenCartPanel: boolean;
  markersPanel: {
    state: boolean;
    id: number;
    locationId: number;
  };
}

const initialState: IModals = {
  productModal: false,
  registerModal: false,
  loginModal: false,
  forgotPassword: false,
  resetPassword: false,
  isOpenProjectAdminSettings: false,
  isOpenCartPanel: false,
  markersPanel: {
    state: false,
    id: 0,
    locationId: 0,
  },
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

    handleSetCurrentIDForMarkersPanel(state, action) {
      state.markersPanel = {
        state: true,
        ...action.payload,
      };
    },

    handleOpenCartPanel(state) {
      state.isOpenCartPanel = true;
    },

    handleCloseModals(state) {
      state.productModal = false;
      state.registerModal = false;
      state.loginModal = false;
      state.forgotPassword = false;
      state.resetPassword = false;
      state.isOpenCartPanel = false;
      state.isOpenProjectAdminSettings = false;
      state.markersPanel = {
        state: false,
        id: 0,
        locationId: 0,
      };
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
  handleSetCurrentIDForMarkersPanel,
  handleOpenCartPanel,
} = modals.actions;

export default modals.reducer;
