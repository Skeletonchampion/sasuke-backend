import bcrypt from "bcrypt";
import { Request, Response } from "express";

import Customer from "../models/Customer.js";

import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

export default async function authLogin(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
        const customer = await Customer.findOne({ username }).lean();
        
        if (!customer) return res.json({ err: "Wrong username or password!" });
        // bcrypt.compare(password, customer.password, (err, same) => {
        //     if (err) console.error(err);
        //     console.log(password, customer.password, same)
        //     if (!same) return res.json({ err: "Wrong username or password!" });

        //     const accessToken = generateAccessToken(customer);
        //     const refreshToken = generateRefreshToken(customer);
            
        //     res.cookie("refreshToken", refreshToken);

        //     res.json({ accessToken });
        // });

        if (password !== customer.password) return res.json({ err: "Wrong username or password!" });

        const accessToken = generateAccessToken(customer);
        const refreshToken = generateRefreshToken(customer);
        
        res.cookie("refreshToken", refreshToken);

        res.json({ accessToken });
    }
    catch (err: any) {
        throw new Error(err);
    }
}