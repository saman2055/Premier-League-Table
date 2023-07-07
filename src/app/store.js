import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { FetchApi } from "../services/fetch";
const store = configureStore({
  reducer: {
    [FetchApi.reducerPath]: FetchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(FetchApi.middleware),
});
setupListeners(store.dispatch);
export default store;
