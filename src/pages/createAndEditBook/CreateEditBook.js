import React from "react";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/authSlice";
import {
  createValidationSchema,
  createValidationSchemaBook,
} from "../../helperFunctions";
import { apiCall } from "../../apiCall";
import { loadingAction } from "../../store/loadingSlice";
import { toastAction } from "../../store/toastSlice";
import { CREATEBOOK, EDITBOOK } from "../../URLS";
import { bookAction } from "../../store/booksSlice";
const CreateEditBook = (props) => {
  let { status } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const book = location.state?.book;
  console.log(book);
  const initialValues =
    status !== "edit"
      ? { title: "", author: "", publishYear: "" }
      : {
          title: book.title,
          author: book.author,
          publishYear: book.publishYear,
        };
  const validationSchema = createValidationSchemaBook();
  const handleSubmit = async (values, errors) => {
    try {
      dispatch(loadingAction.toggleLoading(true));

      await new Promise((resolve) => setTimeout(resolve, 2000));

      let data;
      if (status === "edit") {
        data = await apiCall("PATCH", EDITBOOK, { ...values, id: book._id });
      } else {
        data = await apiCall("POST", CREATEBOOK, values);
      }
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
    <div>
      <div className="main">
        <div>
          <h1>{status.toUpperCase()}</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form className="myForm">
              {status !== "login" ? (
                <Form.Group className="mb-3 myInput" controlId="formBasicName">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    name="title"
                    /* Set onChange to handleChange */
                    onChange={handleChange}
                    /* Set onBlur to handleBlur */
                    onBlur={handleBlur}
                    /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                    value={values.title}
                    error={!!touched.title && !!errors.title}
                    type="text"
                    placeholder="Enter Title"
                    className={touched.title && errors.title ? "error" : null}
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                  />
                  {touched.title && errors.title ? (
                    <div className="error-message">
                      {errors.title}
                      {touched.title}
                    </div>
                  ) : (
                    <div>
                      <Form.Text className="text-muted"></Form.Text>
                    </div>
                  )}
                  {/*  */}
                </Form.Group>
              ) : null}
              <Form.Group className="mb-3 myInput" controlId="formBasicEmail">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  name="author"
                  /* Set onChange to handleChange */
                  onChange={handleChange}
                  /* Set onBlur to handleBlur */
                  onBlur={handleBlur}
                  /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                  value={values.author}
                  error={!!touched.author && !!errors.author}
                  type="text"
                  placeholder="Enter Author"
                  className={touched.author && errors.author ? "error" : null}
                  style={{ marginTop: "10px", marginBottom: "20px" }}
                />
                {touched.author && errors.author ? (
                  <div className="error-message">
                    {errors.author}
                    {touched.author}
                  </div>
                ) : (
                  <div></div>
                )}
                {/*  */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Publish Year</Form.Label>
                <Form.Control
                  name="publishYear"
                  /* Set onChange to handleChange */
                  onChange={handleChange}
                  /* Set onBlur to handleBlur */
                  onBlur={handleBlur}
                  /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                  value={values.publishYear}
                  placeholder="Publish Year"
                  className={
                    touched.publishYear && errors.publishYear ? "error" : null
                  }
                  style={{ marginTop: "10px", marginBottom: "20px" }}
                />
                {touched.publishYear && errors.publishYear ? (
                  <div className="error-message">{errors.publishYear}</div>
                ) : null}
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateEditBook;
