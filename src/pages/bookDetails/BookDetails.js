import React from "react";
import "./BookDetails.css";
import { LuArrowBigLeft } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowButton from "../../components/ArrowButton";

const BookDetails = (props) => {
  const navigate = useNavigate();
  const books = useSelector((state) => {
    return state.books;
  });
  const location = useLocation();
  const book = location.state.book;
  const handleClick = () => {
    navigate(`/homepage/${books.urlStatus.toLowerCase()}`);
  };
  return (
    <div className="mainDetails">
      <ArrowButton books={books} headline="Book Information" />

      <div className="details-box">
        <div className="details-info">
          <h4>ID</h4>
          <span className="book-info">{book._id}</span>
        </div>
        <div className="details-info">
          <h4>Title</h4>
          <span className="book-info">{book.title}</span>
        </div>
        <div className="details-info">
          <h4>Author</h4>
          <span className="book-info">{book.author}</span>
        </div>
        <div className="details-info">
          <h4>Publish Year</h4>
          <span className="book-info">{book.publishYear}</span>
        </div>
        <div className="details-info">
          <h4>Create Time</h4>
          <span className="book-info">{book.createdAt.split(".")[0]}</span>
        </div>
        <div className="details-info">
          <h4>Update Time</h4>
          <span className="book-info">{book.updatedAt.split(".")[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
