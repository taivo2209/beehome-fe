import { configureStore } from "@reduxjs/toolkit";
import agentSlice from "../features/agent/agentSlice";
import { api } from "../features/api/api";
import filterSlice from "../features/filter/filterSlice";
import propertiesSlice from "../features/properties/propertiesSlice";
import authSlice from "../features/auth/authSlice";
import categoriesSlice from "../features/categories/categoriesSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    properties: propertiesSlice,
    filter: filterSlice,
    agent: agentSlice,
    auth: authSlice,
    categories: categoriesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

