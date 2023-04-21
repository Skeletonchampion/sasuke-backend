import { Request, Response } from "express";
import Book from "../models/Book";
import BookReview from "../models/BookReview";

export default async function getBook(req: Request, res: Response) {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        if(book === null) return;

        const bookReviews = await BookReview.find({ bookID: req.params.id }).populate("customerID", "username");

        const bookWithReviews = { ...book.toObject(), reviews: bookReviews };

        res.json({ book: bookWithReviews });
    }
    catch (err: any) {
        throw new Error(err);
    }
}