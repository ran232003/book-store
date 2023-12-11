import { createSlice } from "@reduxjs/toolkit";
const BookSlice = createSlice({
  name: "books",
  initialState: { books: [], urlStatus: "Table" },
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    setUrlStatus(state, action) {
      state.urlStatus = action.payload;
    },
  },
});

export default BookSlice;

export const bookAction = BookSlice.actions;
