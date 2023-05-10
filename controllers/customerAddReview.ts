import { Request, Response } from "express";
import Book from "../models/Book";
import BookReview from "../models/BookReview";
import Customer from "../models/Customer";
import EventLog from "../models/EventLog";
import { emitEvent } from "../utils/emitEvent";

export default async function customerAddReview(req: Request, res: Response) {
    try {
        const { bookID, customerID, comment, rating } = req.body;
        const body = { ...req.body, createdAt: new Date() };

        await BookReview.create(body);
        
        const customer = await Customer.findOne({ _id: customerID }).lean();
        const username = customer.username;
        
        const book = await Book.findOne({ _id: bookID }).lean();
        const title = book.title;

        const newEventLog: EventLog = {
            type: "customer_review",
            date: new Date(),
            log: `Customer %${username}% has reviewed the book %${title}%.`,
            data: {
                username,
                title,
                bookReview: body
            }
        }
        await EventLog.create(newEventLog);
        emitEvent(newEventLog);

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