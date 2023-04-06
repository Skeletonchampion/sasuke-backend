import { Request, Response } from "express";
import Book from "../models/Book";

export default async function getBooks(req: Request, res: Response) {

    try {
        const books = await Book.aggregate([{ $sample: { size: 10 } }]);

        res.json(books);
    }
    catch (err: any) {
        throw new Error(err);
    }
}