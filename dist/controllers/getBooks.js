"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Book_1 = __importDefault(require("../models/Book"));
const probe = require('probe-image-size');
function getBooks(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const type = (_a = req.query) === null || _a === void 0 ? void 0 : _a.type;
        const pageStr = (_b = req.query) === null || _b === void 0 ? void 0 : _b.page;
        const page = parseInt(pageStr) || 1;
        const perPage = 10;
        const skip = (page - 1) * perPage;
        const limit = perPage;
        try {
            let books;
            switch (type) {
                case "lastest-releases": {
                    books = yield Book_1.default.aggregate([
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
                    let pipeline = [
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
                        const objectIds = ids.map((id) => new mongoose_1.default.Types.ObjectId(id));
                        const objectExIDs = exIDs.map((id) => new mongoose_1.default.Types.ObjectId(id));
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
                        const objectExIDs = exIDs.map((id) => new mongoose_1.default.Types.ObjectId(id));
                        pipeline.unshift({
                            $match: { _id: { $nin: objectExIDs } }
                        });
                    }
                    books = yield Book_1.default.aggregate(pipeline);
                    break;
                }
                case "top-rated": {
                    books = yield Book_1.default.aggregate([
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
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.default = getBooks;
function isUrlValid(imgUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield probe(imgUrl);
            return result && result.mime && result.width && result.height;
        }
        catch (error) {
            console.error(`Error checking image URL ${imgUrl}: ${error}`);
            return false;
        }
    });
}
