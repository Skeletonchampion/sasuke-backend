import { Request, Response } from "express";
import BookReview from "../models/BookReview";

export default async function getCustomerReviews(req: Request, res: Response) {
    try {
        const customerID = req.body.customerID;
        if (!customerID) res.status(404).json({ message: "No customerID!" })

        const customerReviews = await BookReview.find({ customerID })
            .populate('bookID')
            .sort({ createdAt: -1 });

        res.json(customerReviews);
    }
    catch (err: any) {
        console.log(err);
    }
}