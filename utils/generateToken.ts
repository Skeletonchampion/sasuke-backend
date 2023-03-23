import jwt from "jsonwebtoken";

export function generateAccessToken(customer: Customer) {
    return jwt.sign(customer, process.env.ACCESS_TOKEN_SECRET!);
}

export function generateRefreshToken(customer: Customer) {
    return jwt.sign(customer, process.env.REFRESH_TOKEN_SECRET!);
}