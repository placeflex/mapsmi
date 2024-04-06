import { createSlice } from "@reduxjs/toolkit";
// types
import { LayoutSettings } from "@/types/layoutTypes";

// helpers and constants
import { storagePoster } from "@/helpers/storageData";
import { productsVariations } from "@/constants/constants";
import {
  defaultLayoutSettings,
  defaultZodiacArtSettings,
  defaultSkyMapLayoutSettings,
} from "@/constants/defaultLayoutSettings";

import { MATERIAL_PRICES, FRAMES_PRICES } from "@/layouts/LayoutAttributes";

// helpers
import { toast } from "react-toastify";

const initialState: { layout: any } = {
  layout: {},
};

const layout = createSlice({
  name: "layout",
  initialState,
  reducers: {
    initLayoutForRenderPage(state, action) {
      state.layout = {
        ...action.payload,
      };
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
          const defaultSettings =
            action.payload == 1
              ? defaultSkyMapLayoutSettings
              : action.payload == 3
              ? defaultZodiacArtSettings
              : defaultLayoutSettings;

          state.layout = {
            ...defaultSettings,
            productId: Number(action.payload),
          };

          storagePoster({
            layout: state.layout,
            productId: state.layout.productId,
          });
        }
      }
    },

    setWallartAdminSettings(state, action) {
      const price =
        state.layout?.selectedAttributes?.frame?.id !== 0
          ? MATERIAL_PRICES[state.layout?.selectedAttributes?.material?.id]
              ?.prices[state.layout.selectedAttributes.size.id].price +
            FRAMES_PRICES[state.layout?.selectedAttributes?.frame?.id]?.price
          : MATERIAL_PRICES[state.layout?.selectedAttributes?.material?.id]
              ?.prices[state.layout.selectedAttributes.size.id].price;

      state.layout = {
        ...state.layout,
        [action.payload.field]: action.payload.value,
        price: price,
      };

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    setProductId(state, action) {
      state.layout.productId = action.payload;
    },

    setLocations(state, action) {
      state.layout = {
        ...state.layout,
        locationsDropdown: action.payload,
      };

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    setElementsColor(state, action) {
      state.layout = {
        ...state.layout,
        elementsColor: action.payload,
      };

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    setMapLabelsColor(state, action) {
      state.layout = {
        ...state.layout,
        labelsTextColor: action.payload,
      };

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    setCurrentLocation(state, action) {
      const multiLocationsIsDisabled =
        !state.layout.connectLocations && state.layout.locations.length == 1;

      const locationWasAdded = state.layout.locations.filter(
        location => location.place_id == action.payload.place_id
      );

      if (locationWasAdded.length >= 1) {
        toast.warning("This location was addes.");
        return;
      }

      // TODO remove fist element
      // if (multiLocationsIsDisabled) {
      //   state.layout.locations.shift();
      // }

      state.layout = {
        ...state.layout,
        locations: state.layout.locations.concat([{ ...action.payload }]),
        locationsDropdown: [],
      };

      if (state.layout.locations.length >= 2) {
        state.layout = {
          ...state.layout,
          connectLocations: true,
        };
      }

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    setCurrentLocationForSkyMap(state, action) {
      state.layout = {
        ...state.layout,
        locations: [action.payload],
        locationsDropdown: [],
      };

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    reOrderLocations(state, action) {
      state.layout = {
        ...state.layout,
        locations: action.payload,
      };

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    deleteLocation(state, action) {
      const currentLocations = state.layout.locations.filter(
        location => location.place_id !== action.payload
      );

      if (currentLocations.length == 1) {
        state.layout = {
          ...state.layout,
          renderMarkers: false,
          connectLocations: false,
          renderLabels: false,
          locations: currentLocations,
          customCoordinates: {},
        };
      } else {
        state.layout = {
          ...state.layout,
          locations: currentLocations,
        };
      }

      if (currentLocations.length == 0) {
        state.layout = {
          ...state.layout,
          renderMarkers: false,
          connectLocations: false,
          renderLabels: false,
        };
      }

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    renderMarkersController(state, action) {
      state.layout = {
        ...state.layout,
        renderMarkers: action.payload,
      };

      if (!action.payload) {
        state.layout = {
          ...state.layout,
          renderLabels: false,
        };
      }

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    handleChangeRouteTypeForStreetMap(state, action) {
      state.layout = {
        ...state.layout,
        routeType: action.payload,
      };

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    renderLabelsController(state, action) {
      console.log(action.payload);

      state.layout = {
        ...state.layout,
        renderLabels: action.payload,
      };

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    connectLocationsController(state, action) {
      state.layout = {
        ...state.layout,
        connectLocations: action.payload,
      };

      storagePoster({
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

      if (action.payload.attr === "size") {
        state.layout = {
          ...state.layout,
          price:
            state.layout.selectedAttributes.material.sizes[
              action.payload.value.id
            ].price + state.layout.selectedAttributes.frame.price,
        };
      }

      if (action.payload.attr === "material") {
        state.layout = {
          ...state.layout,
          price:
            state.layout.selectedAttributes.material.sizes[
              state.layout.selectedAttributes.size.id
            ].price + state.layout.selectedAttributes.frame.price,
        };
      }

      storagePoster({
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
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    handleStylesController(state, action) {
      state.layout = {
        ...state.layout,
        poster: {
          ...state.layout.poster,
          styles: {
            ...state.layout.poster.styles,
            [action.payload.field]: action.payload.value,
          },
        },
      };

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    handleSaveCustomCoordinatesForMap(state, action) {
      state.layout = {
        ...state.layout,
        customCoordinates: {
          ...action.payload,
        },
      };

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    handleChangeFrame(state, action) {
      state.layout = {
        ...state.layout,
        selectedAttributes: {
          ...state.layout.selectedAttributes,
          frame: action.payload,
        },

        price:
          state.layout.selectedAttributes.size.price + action.payload.price,
      };

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },

    handleApplyMarkerForLocation(state, action) {
      console.log("action", action.payload);

      state.layout = {
        ...state.layout,
        locations: state.layout.locations.map(location => {
          if (location.place_id === action.payload.place_id) {
            return {
              ...location,
              markerId: action.payload.markerId,
            };
          }

          return location;
        }),
      };

      storagePoster({
        layout: state.layout,
        productId: state.layout.productId,
      });
    },
  },
});

export const {
  initLayoutForRenderPage,
  initLayout,
  handleChangeStyles,
  handleChangeAttributes,
  handleChangeLables,
  setProductId,
  setDate,
  setLocations,
  setCurrentLocation,
  deleteLocation,
  handleResetLabels,
  handleSaveCustomCoordinatesForMap,
  handleStylesController,
  renderMarkersController,
  connectLocationsController,
  renderLabelsController,
  handleChangeFrame,
  setElementsColor,
  setMapLabelsColor,
  setCurrentLocationForSkyMap,
  reOrderLocations,
  setWallartAdminSettings,
  handleChangeRouteTypeForStreetMap,
  handleApplyMarkerForLocation,
} = layout.actions;

export default layout.reducer;
