import express from "express";

declare global {
    namespace Express {
        interface Request {
            username: string
        }
    }

    interface DecodedPayload {
        username: string;
    }

    interface Customer {
        username: string;
        createdAt: Date;
        cart: string[]
    }

    interface Book {
        title: string;
        authors: string[];
        imgUrl: string;
        summary: string;
        category: string;
        details: {
            isbn10: string;
            isbn13: string;
            weight: string;
            width: string;
            height: string;
            pages: number;
        };
        publisher: string;
        releaseDate: Date;
        price: number;
    }
}