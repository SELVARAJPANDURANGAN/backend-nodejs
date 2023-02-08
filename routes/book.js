import { getBookByID, AddBook, EditBook, deleteByID, getBooks } from '../helper.js';
import {auth} from "./middleware/auth.js"
import express from "express"
const router = express.Router();


//books

// app.get("/book", (req, res) => {
//   res.send(books);
// });


//books/:id and get from mongodb

router.get("/:id", auth, async(req, res) => {
    // app.get("/book/:id",(req, res) => {
    const { id } = req.params;
    console.log(id);
    // Db.books.findOne({id:"id"})
    const book = await getBookByID(id)
    // const book = books.find((bk) => bk.id == id);
    // res.send(book);
  //  book? res.send(book):res.send({message:"Book not found"});
  book? res.send(book):res.status(404).send({message:"Book not found"});
  });
  
  
  //Post book
  //inbuild middleware
  //say data is json
  
  router.post("/", async (req, res) => {
    const newBook = req.body;
    console.log(newBook);
    const result = await AddBook(newBook);
    res.send(result);
  });
  
  // app.post("/book",async (req,res) =>{
  //   const newbook = req.body
  //   console.log(newbook)
  //   const result = await client.db("b41-wd").collection("books").insertMany(newbook)
  //   res.send(result)
  // })
  
  
  
  //put (update books)
  
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedBook = req.body;
    console.log( updatedBook );
    const result = await EditBook(id, updatedBook);
    res.send(result);
  });
  
  
  //books/:id and delete from mongodb
  
  router.delete("/:id", async(req, res) => {
    // app.get("/book/:id",(req, res) => {
    const { id } = req.params;
    console.log(id);
    // Db.books.findOne({id:"id"})
    const book = await deleteByID(id)
    // const book = books.find((bk) => bk.id == id);
  
  });
  
  
  // books/language
  
  // app.get("/book", (req, res) => {
  //   const { language } = req.query;
  // console.log(req.query,language);
  // console.log("Hello")
  // // res.send(books);
  //   res.send(books.filter((bk) => bk.language == language));
  // });
  
  
  // find many books from mongodb
  
  router.get("/", async (req, res) => {
    // const { language, rating } = req.query;
    // console.log(req.query, language);
    // let filteredBooks = books;
  
  //   // if (language) {
  //   //   filteredBooks = filteredBooks.filter((bk) => bk.language == language);
  //   // }
  //   // if (rating) {
  //   //   filteredBooks = filteredBooks.filter((bk) => bk.rating == rating);
  //   // }
  //   if (req.query.rating) {
  //     req.query.rating = +req.query.rating;
  //   }
  //   console.log(req.query);
    const book = await getBooks(req);
    res.send(book);
  });
  
  
  //books/language and rating
  
  // app.get("/book", (req, res) => {
  //   const { language ,rating} = req.query;
  // console.log(req.query,language);
  // console.log("Hello")
  // let filteredBooks=books
  
  // if(language){
  //   (filteredBooks=filteredBooks.filter((bk) => bk.language == language))
  // }
  
  // if(rating){
  //   (filteredBooks=filteredBooks.filter((bk) => bk.rating == rating))
  // }
  // // res.send(books);
  //   res.send(filteredBooks);
  // });
  
  export const bookRouter =  router