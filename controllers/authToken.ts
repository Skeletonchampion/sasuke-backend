import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { generateAccessToken } from "../utils/generateToken.js";

export default function authToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: DecodedPayload) => {
        if(err) return res.sendStatus(401);

        const { username, date } = decoded;
        const user = { username, date};
        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    });
}