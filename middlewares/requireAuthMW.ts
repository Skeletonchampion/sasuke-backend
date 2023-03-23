import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function authRequiredMW(req: Request, res: Response, next: () => void) {
    const accessToken: string | undefined = req.headers["authorization"]?.split(" ")[1];

    if(!accessToken) return res.sendStatus(401);

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
        if(err) return res.sendStatus(401);
        
        req.username = (decoded as DecodedPayload)?.username;
        next();
    });
}