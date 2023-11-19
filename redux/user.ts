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
  email: string;
  token: string;
  name: string;
  projects: Project[];
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
  loggedIn: boolean;
}

const initialUserFields = {
  email: "",
  token: "",
  name: "",
  projects: [],
};

const initialState: UserStateProps = {
  user: initialUserFields,
  loggedIn: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleSaveUser(state, action) {
      console.log("HANDLESAVE");

      state.user = action.payload;
      state.loggedIn = true;

      if (action.payload.token) {
        setToken(action.payload.token);
      }
    },

    handleLogout(state) {
      state.user = initialUserFields;
      state.loggedIn = false;
      deleteToken();
    },

    // handleGetMe(state, action) {
    //   api
    //     .get("/me")
    //     .then((user: any) => {
    //       state.user = user;
    //       state.loggedIn = true;
    //       if (action.payload.token) {
    //         setToken(action.payload.token);
    //       }
    //     })
    //     .catch(({ response }) => {
    //       state.user = initialUserFields;
    //       state.loggedIn = false;
    //       deleteToken();
    //       toast.error(response?.data?.error);
    //     });
    // },

    handleSaveProjectInAccount(state, action) {
      const project = action.payload.update
        ? localStorage.getItem(productsVariations[3])
        : localStorage.getItem(productsVariations[action.payload.id]);

      if (project) {
        const request = api
          .post("/save-project", {
            prjectData: JSON.parse(project),
            update: action.payload.update,
          })
          .then((data: any) => {
            toast.success(data.message);
          })
          .catch(({ response }) => {
            toast.error(response.data.error);
          });

        toast.promise(request, {
          pending: "Processing !",
        });
      }
    },
  },
});

export const { handleSaveUser, handleLogout, handleSaveProjectInAccount } =
  user.actions;

const extra = handleSaveUser;

export default user.reducer;
