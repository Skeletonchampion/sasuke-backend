import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";

import { generateAccessToken } from "../utils/generateToken.js";

export default function authToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err: any, decoded: any) => {
        if(err) return res.sendStatus(401);
        
        const customerID = decoded._id;
        const customer = await Customer.findById(customerID).lean();
        
        const accessToken = generateAccessToken(customer);
        res.json({ accessToken });
    });
}