import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "../HomePage.css";
import CardItem from "./CardItem";

const HomeCard = (props) => {
  const navigate = useNavigate();

  const handleClickPlus = () => {
    navigate("/createEdit/create");
  };
  return (
    <div className="table-container">
      <div className="headerDiv">
        <h1 style={{ marginTop: "10px" }}>Books</h1>
        <CiCirclePlus
          onClick={handleClickPlus}
          size={40}
          style={{ cursor: "pointer", marginRight: "26px" }}
        />
      </div>
      <div className="card-list">
        {props.books.books.map((book) => {
          return <CardItem book={book} />;
        })}
      </div>
    </div>
  );
};

export default HomeCard;
