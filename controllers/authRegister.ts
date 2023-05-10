import { Request, Response } from "express";

import Customer from "../models/Customer";
import EventLog from "../models/EventLog";
import { emitEvent } from "../utils/emitEvent";

export default async function authRegister(req: Request, res: Response, next: () => void) {
    const { username, password } = req.body;

    try {
        const user = await Customer.findOne({ username });

        if (username.length < 4) return res.json({ err: "Username's length need to be larger than 4!" });
        if (password.length < 6) return res.json({ err: "Password's length need to be larger than 6!" });

        if (user) {
            return res.json({ err: "This username's already be taken!" });
        }

        const customer = await Customer.create(req.body);

        const newEventLog: EventLog = {
            type: "customer_register",
            date: new Date(),
            log: `New customer with id %${customer._id}% has registered successfully.`,
            data: {
                customerID: customer._id,
                username: customer.username
            }
        }
        await EventLog.create(newEventLog);
        emitEvent(newEventLog);

        res.json({ message: "Successfully Registered!" });
    }
    catch (err) {
        console.error(err);
    }
}