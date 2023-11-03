import { createSlice } from "@reduxjs/toolkit";
// helpers
import { storagePoster } from "@/helpers/storageData";

import { defaultLineArtSettings } from "@/constants/defaultLayoutSettings";
import { LayoutSettings } from "@/types/layoutTypes";

import { productsStorage } from "@/helpers/storageData";

const initialState: { layout: LayoutSettings } = {
  layout: defaultLineArtSettings,
};

const layout = createSlice({
  name: "layout",
  initialState,
  reducers: {
    initLayout(state, action) {
      if (action.payload) {
        const product = productsStorage[Number(action.payload)];
        const getPoster = localStorage.getItem(product);

        console.log("action.payload", action.payload);

        if (getPoster) {
          const poster = JSON.parse(getPoster);
          state.layout = {
            ...poster,
            productId: Number(action.payload),
          };
        } else {
          state.layout = {
            ...defaultLineArtSettings,
            productId: Number(action.payload),
          };
          storagePoster(state.layout, state.layout.productId);
        }
      }
    },

    setProductId(state, action) {
      state.layout.productId = action.payload;
    },

    setLocations(state, action) {
      state.layout = {
        ...state.layout,
        locations: action.payload,
      };

      storagePoster(state.layout, state.layout.productId);
    },

    setCurrentLocation(state, action) {
      state.layout = {
        ...state.layout,
        currentLocation: action.payload,
      };

      storagePoster(state.layout, state.layout.productId);
    },

    setDate(state, action) {
      state.layout = {
        ...state.layout,
        date: action.payload,
      };

      storagePoster(state.layout, state.layout.productId);
    },

    handleChangeStyles(state, action) {
      state.layout = {
        ...state.layout,
        poster: {
          ...state.layout.poster,
          styles: {
            ...state.layout.poster?.styles,
            [action.payload.style]: Number(action.payload.id),
          },
        },
      };

      storagePoster(state.layout, state.layout.productId);
    },

    handleChangeAttributes(state, action) {
      state.layout = {
        ...state.layout,
        selectedAttributes: {
          ...state.layout.selectedAttributes,
          [action.payload.attr]: action.payload.value,
        },
      };

      storagePoster(state.layout, state.layout.productId);
    },

    handleChangeLables(state, action) {
      state.layout = {
        ...state.layout,
        poster: {
          ...state.layout.poster,
          labels: {
            ...state.layout.poster?.labels,
            [action.payload.label]: action.payload.value,
          },
        },
      };

      storagePoster(state.layout, state.layout.productId);
    },

    handleResetLabels(state) {
      state.layout = {
        ...state.layout,
        poster: {
          ...state.layout.poster,
          labels: {},
        },
      };

      storagePoster(state.layout, state.layout.productId);
    },
  },
});

export const {
  initLayout,
  handleChangeStyles,
  handleChangeAttributes,
  handleChangeLables,
  setProductId,
  setDate,
  setLocations,
  setCurrentLocation,
  handleResetLabels,
} = layout.actions;

export default layout.reducer;
