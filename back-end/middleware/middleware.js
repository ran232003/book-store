const MyError = require("../models/MyError");

const Ajv = require("ajv").default;
const ajv = new Ajv();

const checkSchema = (schemaModule) => {
  return (req, res, next) => {
    try {
      console.log(schemaModule);
      if (!schemaModule) {
        const err = new MyError("missing schema", 500);
        next(err);
      }
      const dynamicModule = require(`../schema/${schemaModule}`);
      const validate_schema = ajv.compile(dynamicModule);
      if (!validate_schema(req.body)) {
        console.log(validate_schema.errors);
        const err = new MyError("Schema Error", 400);
        next(err);
      }
      console.log("SchemaOK");
      next();
    } catch (error) {
      console.log(error);

      const err = new MyError("Internal Error", 500);
      next(err);
    }
  };
};
module.exports = {
  checkSchema,
};
