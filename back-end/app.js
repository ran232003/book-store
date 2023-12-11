const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
const authRouter = require("./routes/auth-route");
const bookRouter = require("./routes/book-route");

const MyError = require("./models/MyError");
const Car = require("./models/CarSchema");
const Book = require("./models/BookSchema");
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your React app's domain
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));

// mongoose.connect(
//   "mongodb+srv://ranfa:232003@cluster0.d2yn9.mongodb.net/BookStore?retryWrites=true&w=majority"
// );
mongoose.connect("mongodb://localhost:27017/BookStore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use("/api/bookstore/user", authRouter);
app.use("/api/bookstore/books", bookRouter);

app.use((req, res, next) => {
  let error = new MyError("not able to find page");
  error.errorCode = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  //console.log(error);
  console.log("error controller", error.message);
  const errorCode = error.code || 500;
  const errorMsg = error.message || "unknown error occurd";
  res.status(errorCode);
  res.json({ status: "fail", msg: errorMsg });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const test = async () => {
  // Create three book documents
  const book1 = new Book({
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishYear: "1925",
  });

  const book2 = new Book({
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishYear: "1960",
  });

  const book3 = new Book({
    title: "1984",
    author: "George Orwell",
    publishYear: "1949",
  });

  // Save the books to the database
  Promise.all([book1.save(), book2.save(), book3.save()])
    .then(() => {
      console.log("Books inserted successfully");
      // Optionally, close the connection to the database if you're done
    })
    .catch((error) => {
      console.error("Error inserting books:", error);
      // Optionally, close the connection to the database if an error occurs
    });
};
