import { Request, Response } from "express";
import mongoose from "mongoose";
import Customer from "../models/Customer";
import EventLog from "../models/EventLog";
import Order from "../models/Order";
import { emitEvent } from "../utils/emitEvent";

export default async function customerPlaceOrder(req: Request, res: Response) {
    try {
        let orderID;

        const customerID = req.body.customerID;
        const cart: { bookID: string, quantity: number }[] = req.body.cart;
        const totalPrice = req.body.totalPrice;
        
        const customer = await Customer.findById(customerID);
        const order = await Order.findById(customerID).lean();

        if (!customer) {
            return res.json({ message: 'Customer not found!' });
        }

        if (true) {
            const updatedCart = customer.cart.map((item) => {
                return {
                    quantity: item.quantity,
                    book: item.bookID
                };
            });

            const order = await Order.create({
                customerID: customerID,
                items: updatedCart,
                totalPrice: totalPrice,
            });
            console.log(order)
            orderID = order._id;
        }

        const customerCart = customer.cart;

        const ids1 = new Set(customerCart.map(item => item.bookID));
        const ids2 = new Set(cart.map(item => item.bookID));
        const unique1 = customerCart.filter(item => !ids2.has(item.bookID!));
        const unique2 = cart.filter(item => !ids1.has(item.bookID));

        const newCart = [...unique1, ...unique2];

        customer.cart = newCart;

        await customer.save();

        const newEventLog: EventLog = {
            type: "customer_order",
            date: new Date(),
            log: `Customer ${customer.username} has placed an order.`,
            data: {
                customerID: customer._id,
                username: customer.username,
                orderID: orderID
            }
        }
        await EventLog.create(newEventLog);
        emitEvent(newEventLog);

        return res.json({ message: "Successfully placeorder!" });
    }
    catch (err: any) {
        return res.status(500).json({
            message: 'Error place order!',
            error: err.message
        });
    }
}