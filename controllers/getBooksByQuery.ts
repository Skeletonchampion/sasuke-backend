import { Request, Response } from "express";
import Book from "../models/Book";

import querystring from "querystring";
import { PipelineStage } from "mongoose";

interface match {
    $match: {
        $and: { [key: string]: any }[]
    }
}

export default async function getBooksByQuery(req: Request, res: Response) {
    try {
        let author, title, keyword;
        const queryObject = querystring.parse(req.url.split('?')[1]);

        if (queryObject.author && typeof queryObject.author === "string") author = queryObject.author.toLowerCase();
        if (queryObject.title && typeof queryObject.title === "string") title = queryObject.title.toLowerCase();
        if (queryObject.keyword && typeof queryObject.keyword === "string") keyword = queryObject.keyword.toLowerCase();

        const match: match = { $match: { $and: [] } };
        let pipeline: PipelineStage[] = [
            {
                $lookup: {
                    from: 'book_reviews',
                    localField: '_id',
                    foreignField: 'bookID',
                    as: 'reviews'
                }
            }
        ];

        if (title) match.$match.$and.push({ title: { $regex: new RegExp(title, 'i') } });
        if (keyword) match.$match.$and.push({ summary: { $regex: new RegExp(keyword, 'i') } });
        if (author) match.$match.$and.push({
            authors: {
                $elemMatch: {
                    $regex: new RegExp(author, 'i')
                }
            }
        });
        pipeline.unshift(match);

        const books = await Book.aggregate(pipeline);

        res.json(books);
    }
    catch (err: any) {
        throw new Error(err);
    }
}