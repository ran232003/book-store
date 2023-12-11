import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { useDispatch, useSelector } from "react-redux";
import "./LoadingSpinners.css";
import { toastAction } from "../store/toastSlice";
function ToastMessage(props) {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const toast = useSelector((state) => {
    return state.toast.toast;
  });
  console.log(toast);
  const close = () => {
    console.log("close");
    dispatch(toastAction.setToast(null));
    //setShow(false);
    //nullErrorMessage();
  };
  useEffect(() => {
    //setShow(true);
  }, []);
  if (toast) {
    return (
      <Row className="custom-toast">
        <Col xs={12}>
          <Toast
            bg={toast.type === "error" ? "danger" : "success"}
            onClose={close}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Body>{toast.errorMessage}</Toast.Body>
          </Toast>
        </Col>
      </Row>
    );
  }
}

export default ToastMessage;
