import { Request, Response } from "express";
import BookReview from "../models/BookReview";

export default async function customerAddReview(req: Request, res: Response) {
    try {
        const { bookID, customerID, comment, rating } = req.body;
        const body = { ...req.body, createdAt: new Date() };

        await BookReview.create(body);

        return res.json({ message: "Successful adding review!" });
    }
    catch (err: any) {
        console.error(err);

        return res.status(500).json({
            message: 'Error adding review!',
            error: err.message
        });
    }
}