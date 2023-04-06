import { Request, Response } from "express";
import Customer from "../models/Customer";

export default async function customerAddItemToCart(req: Request, res: Response) {
    try {
        const customerID = req.body.customerID;
        const bookID = req.body.bookID

        const customer = await Customer.findById(customerID);

        if(!customer) {
            return res.json({ message: 'Customer not found!' });
        }

        const existingCartItemIndex = customer.cart.findIndex((item) => item.bookID === bookID);
        if (existingCartItemIndex === -1) {
            customer.cart.push({ bookID, quantity: 1 });
        } else {
            customer.cart[existingCartItemIndex].quantity++;
        }

        await customer.save();

        return res.json({ message: "Successful updating cart!" });

        // return res.status(404).json({ message: "Failed updating cart!" });
    }
    catch (err: any) {
        console.error(err);

        return res.status(500).json({
            message: 'Error updating cart',
            error: err.message
        });
    }
}