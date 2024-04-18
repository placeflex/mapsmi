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
        const createProject = {
          ...JSON.parse(project),
          price: action.payload.price,
        };

        const request = api
          .post("/popular-wallarts", createProject)
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

    handleDeletePopularProject(state, action) {
      const project = localStorage.getItem(
        productsVariations[action.payload.id]
      );

      if (project) {
        const request = api
          .delete(`/popular-wallarts?projectId=${JSON.parse(project).uuid}`)
          .then((data: any) => {
            toast.success(data.message);
            action.payload.callback && action.payload.callback();
          })
          .catch(({ response }) => {
            toast.error(response.data.error);
          });

        toast.promise(request, {
          pending:
            "Project is deleting from popular projects! Please wait few seconds.",
        });
      }
    },

    handleUpdatePopularProject(state, action) {
      const project = localStorage.getItem(
        productsVariations[action.payload.id]
      );

      if (project) {
        const updateProject = {
          ...JSON.parse(project),
          price: action.payload.price,
        };

        const request = api
          .patch("/popular-wallarts", updateProject)
          .then((data: any) => {
            toast.success(data.message);
          })
          .catch(({ response }) => {
            toast.error(response.data.error);
          });

        toast.promise(request, {
          pending: "Project is updating ! Please wait few seconds.",
        });
      }
    },

    handleGetPopularProjects(state, action) {
      state.wallarts = action.payload;
    },
  },
});

export const {
  handleAddToPopularProjects,
  handleGetPopularProjects,
  handleDeletePopularProject,
  handleUpdatePopularProject,
} = popularWallarts.actions;

export default popularWallarts.reducer;
