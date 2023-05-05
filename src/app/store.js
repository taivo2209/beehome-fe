import { combineReducers, configureStore } from '@reduxjs/toolkit';
import agentSlice from '../features/agent/agentSlice';
import { api } from '../features/api/api';
import filterSlice from '../features/filter/filterSlice';
import propertiesSlice from '../features/properties/propertiesSlice';
import authSlice from '../features/auth/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import categoriesSlice from '../features/categories/categoriesSlice';
import attributesSlice from '../features/attributes/attributesSlice';
import floorSlice from '../features/floor/floorSlice';
import boardingHouseSlice from '../features/boardingHouse/boardingHouseSlice';
import customerSlice from '../features/customer/customerSlice';
import commentSlice from '../features/comment/commentSlice';
// import commentSlice from '../features/comment/commentSlice';

const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = combineReducers({
  properties: propertiesSlice,
  filter: filterSlice,
  agent: agentSlice,
  auth: authSlice,
  categories: categoriesSlice,
  attributes: attributesSlice,
  boardingHouses: boardingHouseSlice,
  customer: customerSlice,
  comment: commentSlice,
  floors: floorSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export const persistor = persistStore(store);
