import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import layout from "./layout";
import modals from "./modals";
import user from "./user";
import popularWallarts from "./popular-wallarts";

const store = configureStore({
  reducer: {
    layout,
    user,
    modals,
    popularWallarts,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
