import { Request, Response } from "express";
import Customer from "../models/Customer";

export default async function customerPlaceOrder(req: Request, res: Response) {
    try {
        const customerID = req.body.customerID;
        const cart: { bookID: string, quantity: number }[] = req.body.cart;

        const customer = await Customer.findById(customerID);

        if (!customer) {
            return res.json({ message: 'Customer not found!' });
        }

        const customerCart = customer.cart;

        const ids1 = new Set(customerCart.map(item => item.bookID));
        const ids2 = new Set(cart.map(item => item.bookID));
        const unique1 = customerCart.filter(item => !ids2.has(item.bookID!));
        const unique2 = cart.filter(item => !ids1.has(item.bookID));

        const newCart = [...unique1, ...unique2];

        customer.cart = newCart;

        await customer.save();

        return res.json({ message: "Successfully placeorder!" });
    }
    catch (err: any) {
        return res.status(500).json({
            message: 'Error place order!',
            error: err.message
        });
    }
}