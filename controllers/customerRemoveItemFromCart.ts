import { Request, Response } from "express";
import Customer from "../models/Customer";

export default async function customerRemoveItemFromCart(req: Request, res: Response) {
    try {
        const customerID = req.body.customerID;
        const bookID = req.body.bookID;

        const customer = await Customer.findById(customerID);

        if(!customer) {
            return res.json({ message: 'Customer not found!' });
        }

        const existingCartItemIndex = customer.cart.findIndex((item) => item.bookID === bookID);

        if (existingCartItemIndex !== -1) {
            if (customer.cart[existingCartItemIndex].quantity > 1) {
                customer.cart[existingCartItemIndex].quantity--;
            } else {
                customer.cart.splice(existingCartItemIndex, 1);
            }
        }

        await customer.save();

        // const document = await Customer.findOneAndUpdate(
        //     { customerID },
        //     { $inc: { "cart.$[item].quantity": -1 } },
        //     {
        //         arrayFilters: [{ "item.bookID": bookID }],
        //         new: true,
        //     }
        // );

        return res.json({ message: "Successful updating cart!" });
    }
    catch (err: any) {
        return res.status(500).json({
            message: 'Error updating cart',
            error: err.message
        });
    }
}