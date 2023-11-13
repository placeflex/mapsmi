import { createSlice } from "@reduxjs/toolkit";
// types
import { LayoutSettings } from "@/types/layoutTypes";

// helpers and constants
import { storagePoster } from "@/helpers/storageData";
import { productsVariations } from "@/constants/constants";
import { defaultLineArtSettings } from "@/constants/defaultLayoutSettings";

const initialState: { layout: LayoutSettings } = {
  layout: defaultLineArtSettings,
};

const layout = createSlice({
  name: "layout",
  initialState,
  reducers: {
    initFromProfile(state, action) {
      state.layout = {
        ...action.payload,
        editingProfileProject: true,
      };

      storagePoster({
        profileStore: true,
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    initLayout(state, action) {
      if (action.payload) {
        const product = productsVariations[Number(action.payload)];
        const getPoster = localStorage.getItem(product);

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

          storagePoster({
            layout: state.layout,
            productId: state.layout.productId,
          });
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

      storagePoster({
        profileStore: state.layout.editingProfileProject,
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    setCurrentLocation(state, action) {
      state.layout = {
        ...state.layout,
        currentLocation: action.payload,
      };

      storagePoster({
        profileStore: state.layout.editingProfileProject,
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    setDate(state, action) {
      state.layout = {
        ...state.layout,
        date: action.payload,
      };

      storagePoster({
        profileStore: state.layout.editingProfileProject,
        layout: state.layout,
        productId: state.layout.productId,
      });
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

      storagePoster({
        profileStore: state.layout.editingProfileProject,
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    handleChangeAttributes(state, action) {
      state.layout = {
        ...state.layout,
        selectedAttributes: {
          ...state.layout.selectedAttributes,
          [action.payload.attr]: action.payload.value,
        },
      };

      storagePoster({
        profileStore: state.layout.editingProfileProject,
        layout: state.layout,
        productId: state.layout.productId,
      });
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

      storagePoster({
        profileStore: state.layout.editingProfileProject,
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    handleResetLabels(state) {
      state.layout = {
        ...state.layout,
        poster: {
          ...state.layout.poster,
          labels: {},
        },
      };

      storagePoster({
        profileStore: state.layout.editingProfileProject,
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    handleSaveCustomCoordinatesForMap(state, action) {
      state.layout = {
        ...state.layout,
        currentLocation: {
          ...state.layout.currentLocation,
          customCoordinates: action.payload,
        },
      };

      storagePoster({
        profileStore: state.layout.editingProfileProject,
        layout: state.layout,
        productId: state.layout.productId,
      });
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
  initFromProfile,
  handleSaveCustomCoordinatesForMap,
} = layout.actions;

export default layout.reducer;
