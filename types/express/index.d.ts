import express from "express";

interface DecodedPayload {
    username: string;
}

interface Customer {
    username: string;
    createdAt: Date
}

declare global {
    namespace Express {
        interface Request {
            username: string
        }
    }

    type Customer = Customer;
    type DecodedPayload = DecodedPayload;
}