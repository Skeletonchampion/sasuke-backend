import { Request, Response } from "express";
import Book from "../models/Book";

export default async function getBook(req: Request, res: Response) {
    try {
        const book = await Book.find({ _id: req.params.id});
        res.json(book);
    }
    catch (err: any) {
        throw new Error(err);
    }
}