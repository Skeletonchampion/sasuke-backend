import { Request, Response } from "express";
import Book from "../models/Book";

export default async function getBooksByCategory(req: Request, res: Response) {
    try {
        const books = await Book.aggregate([
            { $match: { category: req.params.category } },
            {
                $lookup: {
                    from: 'book_reviews',
                    localField: '_id',
                    foreignField: 'bookID',
                    as: 'reviews'
                }
            }
        ]);

        res.json(books);
    }
    catch (err: any) {
        throw new Error(err);
    }
}