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
function getBooksByCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield Book_1.default.aggregate([
                { $match: { category: req.params.category } },
                {
                    $lookup: {
                        from: 'book_reviews',
                        localField: '_id',
                        foreignField: 'bookID',
                        as: 'reviews'
                    }
                }
            ]);
            res.json(books);
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.default = getBooksByCategory;
