import bcrypt from "bcrypt";
import { Request, Response } from "express";

import Customer from "../models/Customer.js";

import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

export default async function authLogin(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
        const customer = await Customer.findOne({ username });

        if (!customer) return res.json({ err: "Wrong username or password!" });

        bcrypt.compare(password, customer.password, (err, same) => {
            if (err) console.error(err);

            if (!same) return res.json({ err: "Wrong username or password!" });

            const myCustomer = {
                username: customer.username,
                createdAt: customer.createdAt
            }
            const accessToken = generateAccessToken(myCustomer);
            const refreshToken = generateRefreshToken(myCustomer);
            
            res.cookie("refreshToken", refreshToken);

            res.json({ accessToken });
        });
    }
    catch (err: any) {
        throw new Error(err);
    }
}