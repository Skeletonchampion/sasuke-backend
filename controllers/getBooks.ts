import axios from "axios";
import { Request, Response } from "express";
import mongoose, { PipelineStage } from "mongoose";
import Book from "../models/Book";

const probe = require('probe-image-size');

export default async function getBooks(req: Request, res: Response) {
    const type = req.query?.type as string;

    const pageStr = req.query?.page as string;
    const page = parseInt(pageStr) || 1;
    const perPage = 10;

    const skip = (page - 1) * perPage;
    const limit = perPage;

    try {
        let books: any

        switch (type) {
            case "lastest-releases": {
                books = await Book.aggregate([
                    {
                        $lookup: {
                            from: 'book_reviews',
                            localField: '_id',
                            foreignField: 'bookID',
                            as: 'reviews'
                        }
                    },
                    {
                        $sort: {
                            releaseDate: -1
                        }
                    }
                ]).skip(skip).limit(limit);

                break;
            }
            case "random-books": {
                const ids = req.body.ids;
                const exIDs = req.body.exIDs;

                let pipeline: PipelineStage[] = [
                    { $sample: { size: perPage } },
                    {
                        $lookup: {
                            from: 'book_reviews',
                            localField: '_id',
                            foreignField: 'bookID',
                            as: 'reviews'
                        }
                    }
                ];

                if (ids && ids.length === perPage) {
                    const objectIds = ids.map((id: string) => new mongoose.Types.ObjectId(id));
                    const objectExIDs = exIDs.map((id: string) => new mongoose.Types.ObjectId(id));

                    pipeline.splice(0, 1);
                    pipeline.unshift({
                        $match: {
                            $and: [
                                { _id: { $in: objectIds } },
                                { _id: { $nin: objectExIDs } }
                            ]
                        }
                    });
                }
                else if (!ids && exIDs) {
                    const exIDs = req.body.exIDs;
                    const objectExIDs = exIDs.map((id: string) => new mongoose.Types.ObjectId(id));

                    pipeline.unshift({
                        $match: { _id: { $nin: objectExIDs } }
                    });
                }

                books = await Book.aggregate(pipeline);

                break;
            }
            case "top-rated": {
                books = await Book.aggregate([
                    {
                        $lookup: {
                            from: "book_reviews",
                            localField: "_id",
                            foreignField: "bookID",
                            as: "reviews"
                        }
                    },
                    {
                        $addFields: {
                            avgRating: { $avg: "$reviews.rating" }
                        }
                    },
                    {
                        $sort: {
                            avgRating: -1
                        }
                    }
                ]).skip(skip).limit(limit);

                break;
            }
        }

        const validBooks = [];
        let numValidBooks = 0;

        for (let i = 0; i < books.length; i++) {
            const book = books[i];

            // const isValid = await isUrlValid(book.imgUrl);

            if (true) {
                validBooks.push(book);
                ++numValidBooks;
            }

            if (numValidBooks >= 10) {
                break;
            }
        }

        res.json(books);
    }
    catch (err: any) {
        throw new Error(err);
    }
}

async function isUrlValid(imgUrl: string): Promise<boolean> {
    try {
        const result = await probe(imgUrl);

        return result && result.mime && result.width && result.height;
    }
    catch (error) {
        console.error(`Error checking image URL ${imgUrl}: ${error}`);

        return false;
    }
}