import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { notificationsSlice } from './slices/notificationSlice';
import { authSlice } from './slices/authSlice';
import { productSlice } from './slices/productSlice';

const rootReducer = combineReducers({
  auth : authSlice,
  product : productSlice,
  notifications: notificationsSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['notifications'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
