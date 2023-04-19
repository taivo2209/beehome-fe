import { combineReducers, configureStore } from "@reduxjs/toolkit";
import agentSlice from "../features/agent/agentSlice";
import { api } from "../features/api/api";
import filterSlice from "../features/filter/filterSlice";
import propertiesSlice from "../features/properties/propertiesSlice";
import authSlice from "../features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import categoriesSlice from "../features/categories/categoriesSlice";
import attributesSlice from "../features/attributes/attributesSlice";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
        properties: propertiesSlice,
        filter: filterSlice,
        agent: agentSlice,
        auth: authSlice,
        categories: categoriesSlice,
        attributes: attributesSlice,
});

const persistedReducer = persistReducer(persistConfig,rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
export const persistor = persistStore(store);