import { Request, Response } from "express";
import Book from "../models/Book";

export default async function getBooksByCategory(req: Request, res: Response) {
    try {
        const books = await Book.find({ category: req.params.category });

        res.json(books);
    }
    catch (err: any) {
        throw new Error(err);
    }
}