import { createSlice } from "@reduxjs/toolkit";

// localstorage
import { setToken, deleteToken } from "@/helpers/storageData";

// constants
import { productsVariations } from "@/constants/constants";

// apis
import { api } from "@/axios";

interface UserFieldsProps {
  email: string;
  token: string;
  name: string;
}

interface UserStateProps {
  user: UserFieldsProps;
  loggedIn: boolean;
  projects: [];
}

const initialUserFields = {
  email: "",
  token: "",
  name: "",
};

const initialState: UserStateProps = {
  user: initialUserFields,
  loggedIn: false,
  projects: [],
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleSaveUser(state, action) {
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

    handleSaveProjectInAccount(state, action) {
      const project = action.payload.update
        ? localStorage.getItem(productsVariations[3])
        : localStorage.getItem(productsVariations[action.payload.id]);

      try {
        api
          .post("/save-project", {
            prjectData: JSON.parse(project),
            update: action.payload.update,
          })
          .then(data => {
            console.log(data);
          })
          .catch(({ response }) => {
            console.log("SAVE PROJECT", response.data);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const { handleSaveUser, handleLogout, handleSaveProjectInAccount } =
  user.actions;

export default user.reducer;
