import React from "react";
import { LuArrowBigLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./Components.css";
import { useSelector } from "react-redux";
const ArrowButton = (props) => {
  const navigate = useNavigate();
  const books = useSelector((state) => {
    return state.books;
  });
  const handleClick = () => {
    if (props.books) {
      return navigate(`/homepage/${props.books.urlStatus.toLowerCase()}`);
    }
    return navigate(`/homepage/${books.urlStatus.toLowerCase()}`);
  };
  return (
    <div>
      <button className="arrow-button" onClick={handleClick}>
        <span className="arrow-icon">
          <LuArrowBigLeft size={30} />
        </span>
      </button>
      <h4>{props.headline}</h4>
    </div>
  );
};

export default ArrowButton;
