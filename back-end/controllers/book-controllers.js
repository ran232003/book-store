const MyError = require("../models/MyError");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const User = require("../models/user-schema");
const Book = require("../models/BookSchema");
const addBook = async (req, res, next) => {
  console.log("addBook", req.body);

  try {
    const { title, author, publishYear } = req.body;
    const checkBook = await Book.findOne({ title: title, author: author });
    if (checkBook) {
      const err = new MyError("Book Already Exist", 400);
      return next(err);
    }
    const book = new Book({ title, author, publishYear });
    await book.save();
    const books = await Book.find();
    return res.json({ status: "ok", books, msg: "Book Addad Succusfuly" });
  } catch (error) {
    console.log(error);
    const err = new MyError("Somthing Went Wrong", 500);
    return next(err);
  }
};
const editBook = async (req, res, next) => {
  console.log("editBook", req.body);

  try {
    const { title, author, publishYear, id } = req.body;
    const checkBook = await Book.findById(id);
    if (!checkBook) {
      const err = new MyError("Book Not Found", 400);
      return next(err);
    }
    checkBook.set({ title: title, author: author, publishYear: publishYear });
    await checkBook.save();
    const books = await Book.find();

    return res.json({ status: "ok", books, msg: "Book edit Succusfuly" });
  } catch (error) {
    console.log(error);
    const err = new MyError("Somthing Went Wrong", 500);
    return next(err);
  }
};
const getBooks = async (req, res, next) => {
  console.log("getBooks");
  try {
    const books = await Book.find({});
    return res.json({ status: "ok", books });
  } catch (error) {
    console.log(error);
    const err = new MyError("Somthing Went Wrong", 500);
    return next(err);
  }
};
const deleteBook = async (req, res, next) => {
  console.log("deleteBook");
  try {
    let id = req.params.id;
    if (!id) {
      const err = new MyError("Book Not Found", 400);
      return next(err);
    }
    await Book.deleteOne({ _id: id });
    const books = await Book.find({});
    return res.json({ status: "ok", books, msg: "Book Deleted" });
  } catch (error) {
    console.log(error);
    const err = new MyError("Somthing Went Wrong", 500);
    return next(err);
  }
};
module.exports = {
  addBook,
  getBooks,
  editBook,
  deleteBook,
};
