import { Request, Response } from "express";
import Customer from "../models/Customer";

export default async function customerAddItemToCart(req: Request, res: Response) {
    try {
        const { customerID } = req.body;
        const { fullname, address, phoneNumber, email } = req.body.details;

        // Check if the customerId exists in the database
        const customer = await Customer.findById(customerID);
        if (!customer) {
            return res.status(404).send('Customer not found');
        }

        // Update the customer details
        customer.fullname = fullname;
        customer.address = address;
        customer.phoneNumber = phoneNumber;
        customer.email = email;
        await customer.save();

        return res.json({ message: "Successful updating customer!" });
    }
    catch (err: any) {
        console.error(err);

        return res.status(500).json({
            message: '"Error updating customer!',
            error: err.message
        });
    }
}