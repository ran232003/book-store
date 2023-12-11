import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import ArrowButton from "../../components/ArrowButton";
import "../bookDetails/BookDetails.css";
import { apiCall } from "../../apiCall";
import { loadingAction } from "../../store/loadingSlice";
import { DELETEBOOK } from "../../URLS";
import { toastAction } from "../../store/toastSlice";
import { bookAction } from "../../store/booksSlice";
const DeleteBook = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const book = location.state?.book;
  const handleDelete = async () => {
    try {
      dispatch(loadingAction.toggleLoading(true));

      await new Promise((resolve) => setTimeout(resolve, 2000));

      let data;
      let url = DELETEBOOK + `/${book._id}`;
      data = await apiCall("DELETE", url);

      if (data.status !== "ok") {
        dispatch(loadingAction.toggleLoading(false));
        dispatch(
          toastAction.setToast({
            errorMessage: data.msg,
            type: "error",
            show: true,
          })
        );

        return;
      }
      dispatch(loadingAction.toggleLoading(false));
      dispatch(
        toastAction.setToast({ errorMessage: data.msg, type: "success" })
      );
      dispatch(bookAction.setBooks(data.books));
      navigate("/homepage/table");
    } catch (error) {
      dispatch(loadingAction.toggleLoading(false));
    }
  };
  return (
    <div className="mainDetails">
      <ArrowButton headline="Delete Book" />
      <div className="container-delete">
        <div className="details-box-delete">
          <h3>Are You Sure You Want To Delete This Book?</h3>
          <Button variant="danger" onClick={handleDelete}>
            Yes Delete It
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
