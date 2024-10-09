import { createSlice } from "@reduxjs/toolkit";

// localstorage
import { setToken, deleteToken } from "@/helpers/storageData";

// constants
import { productsVariations } from "@/constants/constants";

// apis
import { api } from "@/axios";

// helpers
import { toast } from "react-toastify";

export interface UserFieldsProps {
  email?: string;
  name?: string;
  role?: string;
}

export interface Project {
  path: string;
  selectedAttributes: any;
  date: string;
  productId: string | number;
  uuid: string;
}
export interface UserStateProps {
  user: UserFieldsProps;
  // loggedIn: boolean;
  isAdmin: boolean;
}

const initialState: UserStateProps = {
  isAdmin: false,
  user: {},
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleSaveUser(state, action) {
      const { token, email, name, role, ...userPayload } = action.payload;

      if (token) {
        setToken(token);
        state.isAdmin = false;
        state.user = { email, name, role };
      }

      if (role === "admin") {
        state.isAdmin = true;
        state.user = { email, name, role };
      }
    },
    handleLogout(state) {
      state.isAdmin = false;
      deleteToken();
    },
    handleSaveProject(state, action) {
      const project = localStorage.getItem(
        productsVariations[action.payload.id]
      );
      if (project) {
        const request = api
          .post("/project", JSON.parse(project))
          .then((data: any) => {
            toast.success(data.message);
          })
          .catch(({ response }) => {
            toast.error(response.data.error);
          });
        toast.promise(request, {
          pending: "Projects is saving in account. Please wait few seconds.",
        });
      }
    },
    // handleUpdateProject(state, action) {
    //   const project = localStorage.getItem(
    //     productsVariations[action.payload.id]
    //   );
    //   if (project) {
    //     const request = api
    //       .patch("/project", JSON.parse(project))
    //       .then((data: any) => {
    //         toast.success(data.message);
    //       })
    //       .catch(({ response }) => {
    //         toast.error(response.data.error);
    //       });
    //     toast.promise(request, {
    //       pending: "Project is updating! Please wait few seconds.",
    //     });
    //   }
    // },
    // handleDeleteProject(state, action) {
    //   const request = api
    //     .delete(`/project?id=${action.payload.id}`)
    //     .then((data: any) => {
    //       toast.success(data.message);
    //       action.payload.callback && action.payload.callback();
    //     })
    //     .catch(({ response }) => {
    //       toast.error(response.data.error);
    //     });
    //   toast.promise(request, {
    //     pending: "Project is deleting! Please wait few seconds.",
    //   });
    // },
  },
});

export const {
  handleSaveUser,
  handleLogout,
  // will remoce handleSaveProject
  handleSaveProject,
  // handleUpdateProject,
  // handleDeleteProject,
} = user.actions;

export default user.reducer;
