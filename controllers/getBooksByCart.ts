import { Request, Response } from "express";
import Book from "../models/Book";
import Customer from "../models/Customer";

export default async function getBooksByCart(req: Request, res: Response) {
    try {
        const cartBooks: any[] = [];

        const customerID = req.query.customerID;
        if(!customerID) res.status(404).json({ message: "No customerID!" })

        const customer = await Customer.findById(customerID).lean();

        for(const item of customer.cart) {
            const book = await Book.findOne({ _id: item.bookID }).lean();
            cartBooks.push(book);
        }
        
        res.json(cartBooks);
    }
    catch (err: any) {
        console.log(err);
    }
}