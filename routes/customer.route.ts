import express, { Request, Response } from "express";
import customerAddItemToCart from "../controllers/customerAddItemToCart";
import customerRemoveItemFromCart from "../controllers/customerRemoveItemFromCart";
import customerUpdateDetails from "../controllers/customerUpdateDetails";
import customerPlaceOrder from "../controllers/customerPlaceOrder";
import customerAddReview from "../controllers/customerAddReview";
import getCustomerOrders from "../controllers/getCustomerOrders";
import getCustomerReviews from "../controllers/getCustomerReviews";
import mongoose from "mongoose";
import Order from "../models/Order";

const { ObjectId } = mongoose.Types;

const router = express.Router();

router
    // .post("/username", getCustomerUsername)
    .post("/order", getCustomerOrder)
    .post("/orders", getCustomerOrders)
    .post("/reviews", getCustomerReviews)
    .post("/cart/add", customerAddItemToCart)
    .post("/cart/remove", customerRemoveItemFromCart)
    .post("/details/update", customerUpdateDetails)
    .post("/placeorder", customerPlaceOrder)
    .post("/reviews/add", customerAddReview);

async function getCustomerOrder(req: Request, res: Response) {
    try {
        const { customerID, orderID } = req.body;
        if (!customerID) res.status(404).json({ message: "No customerID!" });

        const customerOrders = await Order.findOne({ customerID: new ObjectId(customerID), _id: new ObjectId(orderID) }).populate('items.book');

        res.json(customerOrders);
    }
    catch (err: any) {
        console.log(err);
    }
}

// async function getCustomerUsername(req: Request, res: Response) {
//     try {
//         const customerID = req.body.customerID;
//         if (!customerID) res.status(404).json({ message: "No customerID!" })

//         const customer = await Customer.findOne({ customerID }).lean();
//         const { username } = customer;

//         res.json(username);
//     }
//     catch (err: any) {
//         console.log(err);
//     }
// }

export default router;