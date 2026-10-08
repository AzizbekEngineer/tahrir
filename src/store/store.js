import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { api } from "../services/api";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});