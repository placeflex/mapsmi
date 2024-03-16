import { createSlice } from "@reduxjs/toolkit";

// constants
import { productsVariations } from "@/constants/constants";

// helpers
import { toast } from "react-toastify";

// apis
import { api } from "@/axios";

const initialState = {
  wallarts: [],
};

const popularWallarts = createSlice({
  name: "popularWallarts",
  initialState,
  reducers: {
    handleAddToPopularProjects(state, action) {
      const project = localStorage.getItem(
        productsVariations[action.payload.id]
      );

      if (project) {
        const request = api
          .post("/popular-wallarts", JSON.parse(project))
          .then((data: any) => {
            toast.success(data.message);
          })
          .catch(({ response }) => {
            toast.error(response.data.error);
          });

        toast.promise(request, {
          pending:
            "Project is adding to popular projects! Please wait few seconds.",
        });
      }
    },

    handleGetPopularProjects(state, action) {
      state.wallarts = action.payload;
    },
  },
});

export const { handleAddToPopularProjects, handleGetPopularProjects } =
  popularWallarts.actions;

export default popularWallarts.reducer;
