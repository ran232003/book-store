import * as Yup from "yup";

export const createValidationSchema = (status) => {
  return status === "login"
    ? Yup.object().shape({
        email: Yup.string()
          .required("Email Required")
          .min(4, "Min number is 4")
          .max(20, "Max number of chars is 20")
          .email("Not Valid Email"),
        password: Yup.string()
          .required("Password Required")
          .min(6, "Min number is 6")
          .max(20, "Max number of chars is 20"),
      })
    : Yup.object().shape({
        name: Yup.string()
          .required("Name Required")
          .min(4, "Min number is 4")
          .max(20, "Max number of chars is 20"),
        email: Yup.string()
          .required("Email Required")
          .min(4, "Min number is 4")
          .max(20, "Max number of chars is 20")
          .email("Not Valid Email"),
        password: Yup.string()
          .required("Password Required")
          .min(6, "Min number is 6")
          .max(20, "Max number of chars is 20"),
      });
};
export const createValidationSchemaBook = () => {
  Yup.object().shape({
    title: Yup.string()
      .required("Tile is Required")
      .min(2, "Min number is 4")
      .max(40, "Max number of chars is 40"),

    author: Yup.string()
      .required("Author Required")
      .min(2, "Min number is 2")
      .max(50, "Max number of chars is 50"),
    publishYear: Yup.string()
      .required("Publish Year Required")
      .min(1, "Min number is 1")
      .max(4, "Max number of chars is 4"),
  });
};
