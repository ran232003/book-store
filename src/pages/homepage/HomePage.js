import React, { useEffect } from "react";
import { apiCall } from "../../apiCall";
import { GETBOOKS } from "../../URLS";
import { useDispatch, useSelector } from "react-redux";
import { bookAction } from "../../store/booksSlice";

import "./HomePage.css";
import HomeCard from "./components/HomeCard";
import HomePageTable from "./components/HomePageTable";
const HomePage = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => {
    return state.books;
  });
  const getBooks = async () => {
    try {
      const data = await apiCall("GET", GETBOOKS, null);
      if (data.books) {
        dispatch(bookAction.setBooks(data.books));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBooks();
  }, []);
  console.log(books);
  if (books.books.length > 0 && books.urlStatus === "Table") {
    return (
      <div>
        <HomePageTable books={books} />
      </div>
    );
  } else if (books.books.length > 0 && books.urlStatus === "Cards") {
    return <HomeCard books={books} />;
  } else {
    return (
      <div className="no-books-container">
        <h2>No Books Found</h2>
        <p>
          It seems there are no books available. Check back later or add some
          books!
        </p>
        {/* You can add more styling or customization as needed */}
      </div>
    );
  }
};

export default HomePage;
