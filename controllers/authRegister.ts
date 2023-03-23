import { Request, Response } from "express";

import Customer from "../models/Customer";

export default async function authRegister(req: Request, res: Response, next: () => void) {
    const {username, password} = req.body;

    try {
        const user = await Customer.findOne({username});
        
        if(username.length < 4) return res.json({err: "Username's length need to be larger than 4!"});
        if(password.length < 6) return res.json({err: "Password's length need to be larger than 6!"});

        if(user) {
            return res.json({err: "This username's already be taken!"});
        }
        
        await Customer.create(req.body);
        res.json({message: "Successfully Registered!"});
    }
    catch(err) {
        console.error(err);
    }
}