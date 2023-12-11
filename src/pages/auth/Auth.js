import React from "react";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import "./Auth.css";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/authSlice";
import { createValidationSchema } from "../../helperFunctions";
import { apiCall } from "../../apiCall";
import { LOGIN, SIGNUP } from "../../URLS";
import { loadingAction } from "../../store/loadingSlice";
import { toastAction } from "../../store/toastSlice";
const Auth = () => {
  const statusMap = { login: "signup", signup: "login" };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { status } = useParams();
  console.log(status);
  let text =
    status === "login" ? "if you are not signUp  " : "if you are signUp  ";
  const initialValues =
    status === "login"
      ? { email: "", password: "" }
      : { email: "", password: "", name: "" };
  const validationSchema = createValidationSchema(status);
  const handleSubmit = async (values, errors) => {
    try {
      console.log(values);
      let data;
      dispatch(loadingAction.toggleLoading(true));
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (status === "login") {
        data = await apiCall("POST", LOGIN, values);
      } else {
        data = await apiCall("POST", SIGNUP, values);
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
      dispatch(authAction.setUser(data.user));
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
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    name="name"
                    /* Set onChange to handleChange */
                    onChange={handleChange}
                    /* Set onBlur to handleBlur */
                    onBlur={handleBlur}
                    /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                    value={values.name}
                    error={!!touched.name && !!errors.name}
                    type="text"
                    placeholder="Enter Name"
                    className={touched.name && errors.name ? "error" : null}
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                  />
                  {touched.name && errors.name ? (
                    <div className="error-message">
                      {errors.name}
                      {touched.name}
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
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  /* Set onChange to handleChange */
                  onChange={handleChange}
                  /* Set onBlur to handleBlur */
                  onBlur={handleBlur}
                  /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  type="email"
                  placeholder="Enter email"
                  className={touched.email && errors.email ? "error" : null}
                  style={{ marginTop: "10px", marginBottom: "20px" }}
                />
                {touched.email && errors.email ? (
                  <div className="error-message">
                    {errors.email}
                    {touched.email}
                  </div>
                ) : (
                  <div>
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </div>
                )}
                {/*  */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  /* Set onChange to handleChange */
                  onChange={handleChange}
                  /* Set onBlur to handleBlur */
                  onBlur={handleBlur}
                  /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                  value={values.password}
                  type="password"
                  placeholder="Password"
                  className={
                    touched.password && errors.password ? "error" : null
                  }
                  style={{ marginTop: "10px", marginBottom: "20px" }}
                />
                {touched.password && errors.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
              <div style={{ marginTop: "10px" }}>
                {text}
                <Link to={`/auth/${statusMap[status]}`}>Click here</Link>
              </div>
              <div style={{ marginTop: "10px" }}>
                Forgot youre password? <Link to={`/forgot`}>Click here</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Auth;
