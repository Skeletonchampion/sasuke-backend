import { Request, Response } from "express";
import Book from "../models/Book";
import Order from "../models/Order";

export default async function getCustomerOrders(req: Request, res: Response) {
    try {
        const customerID = req.body.customerID;
        if(!customerID) res.status(404).json({ message: "No customerID!" })
        
        const customerOrders = await Order.find({ customerID }).populate('items.book');;
        
        res.json(customerOrders);
    }
    catch (err: any) {
        console.log(err);
    }
}