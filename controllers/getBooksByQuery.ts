import { Request, Response } from "express";
import Book from "../models/Book";

export default async function getBooksByQuery(req: Request, res: Response) {
    try {
        const query = req.params.query.toLowerCase();
        const books = await Book.find({ title: { $regex: new RegExp(query, 'i') } });

        res.json(books);
    }
    catch (err: any) {
        throw new Error(err);
    }
}