let express = require("express");
const { signUp, login } = require("../controllers/auth-controllers");
const { checkSchema } = require("../middleware/middleware");
const router = express.Router();
router.post("/signup", checkSchema("signup-schema.json"), signUp);
router.post("/login", checkSchema("login-schema.json"), login);

module.exports = router;
