let express = require("express");
const { checkSchema } = require("../middleware/middleware");
const {
  getBooks,
  editBook,
  addBook,
  deleteBook,
} = require("../controllers/book-controllers");
const router = express.Router();
router.get("/getBooks", getBooks);
router.patch("/editBook", editBook);
router.post("/createBook", checkSchema("book-schema.json"), addBook);
router.delete("/deleteBook/:id", deleteBook);

module.exports = router;
