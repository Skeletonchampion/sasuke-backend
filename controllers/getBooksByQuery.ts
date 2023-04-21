import { Request, Response } from "express";
import Book from "../models/Book";

export default async function getBooksByQuery(req: Request, res: Response) {
    try {
        const query = req.params.query.toLowerCase();
        const books = await Book.aggregate([
            { $match: { title: { $regex: new RegExp(query, 'i') } } },
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