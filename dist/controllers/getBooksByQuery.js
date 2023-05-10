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
const Book_1 = __importDefault(require("../models/Book"));
const querystring_1 = __importDefault(require("querystring"));
function getBooksByQuery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let author, title, keyword;
            const queryObject = querystring_1.default.parse(req.url.split('?')[1]);
            if (queryObject.author && typeof queryObject.author === "string")
                author = queryObject.author.toLowerCase();
            if (queryObject.title && typeof queryObject.title === "string")
                title = queryObject.title.toLowerCase();
            if (queryObject.keyword && typeof queryObject.keyword === "string")
                keyword = queryObject.keyword.toLowerCase();
            const match = { $match: { $and: [] } };
            let pipeline = [
                {
                    $lookup: {
                        from: 'book_reviews',
                        localField: '_id',
                        foreignField: 'bookID',
                        as: 'reviews'
                    }
                }
            ];
            if (title)
                match.$match.$and.push({ title: { $regex: new RegExp(title, 'i') } });
            if (keyword)
                match.$match.$and.push({ summary: { $regex: new RegExp(keyword, 'i') } });
            if (author)
                match.$match.$and.push({
                    authors: {
                        $elemMatch: {
                            $regex: new RegExp(author, 'i')
                        }
                    }
                });
            pipeline.unshift(match);
            const books = yield Book_1.default.aggregate(pipeline);
            res.json(books);
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.default = getBooksByQuery;
