import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice";
import LoadingSlice from "./loadingSlice";
import ToastSlice from "./toastSlice";
import BookSlice from "./booksSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    loading: LoadingSlice.reducer,
    toast: ToastSlice.reducer,
    books: BookSlice.reducer,
  },
});
export default store;
