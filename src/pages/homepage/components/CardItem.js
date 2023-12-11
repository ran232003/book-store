import React from "react";
import { GoBook } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { CustomViewCellRenderer } from "./HomePageTable";

const CardItem = (props) => {
  const { book } = props;
  return (
    <div className="card-item-main">
      <div className="card-year">{book.publishYear}</div>
      <div className="card-title" style={{ marginBottom: "10px" }}>
        <GoBook size={25} style={{ marginRight: "10px" }} color="pink" />
        {book.title}
      </div>
      <div className="card-author">
        <FaRegUserCircle
          size={25}
          style={{ marginRight: "10px" }}
          color="pink"
        />
        {book.author}
      </div>
      <div className="test">
        <CustomViewCellRenderer book={book} styleComponent="cards-icons-div" />
      </div>
    </div>
  );
};

export default CardItem;
