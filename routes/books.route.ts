import express from "express";
import getBook from "../controllers/getBook";

import getBooks from "../controllers/getBooks";
import getBooksByCart from "../controllers/getBooksByCart";
import getBooksByCategory from "../controllers/getBooksByCategory";
import getBooksByQuery from "../controllers/getBooksByQuery";

const router = express.Router();

router
 .post("/all", getBooks)
 .get("/id/:id", getBook)
 .get("/category/:category", getBooksByCategory)
 .get("/search/:query", getBooksByQuery)
 .get("/cart", getBooksByCart);

export default router;