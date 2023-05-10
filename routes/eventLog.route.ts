import express, { Request, Response } from "express";
import Book from "../models/Book";
import Customer from "../models/Customer";
import EventLog from "../models/EventLog";
import Order from "../models/Order";

import eventEmitter from "../utils/getEventEmiter";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        });

        res.write(`event: message\ndata: connected\n\n`);

        function eventListener(eventLog: EventLog) {
            try {
                res.write(`event: message\ndata: ${JSON.stringify(eventLog)}\n\n`);
            } catch (error) {
                console.error(error);
            }
        }

        eventEmitter.on('message', eventListener);

        res.on('close', () => {
            eventEmitter.removeListener('message', eventListener);
        });
    }
    catch (err: any) {
        console.error(err);
    }
});

router.get("/data", async (req: Request, res: Response) => {
    try {
        const totalProfitArray = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: "$totalPrice" }
                }
            }
        ]);
        const totalProfit = totalProfitArray[0].totalPrice;

        const totalProducts = await Book.find({}).count();

        const totalCustomers = await Customer.find({}).count();

        const eventLogs = await EventLog.find({}).sort({ date: -1 }).limit(10);

        res.json({ totalProfit, totalProducts, totalCustomers, eventLogs })
    }
    catch (err: any) {
        console.error(err);
    }
});

export default router;