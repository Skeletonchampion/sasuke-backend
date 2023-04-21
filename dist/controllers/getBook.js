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
const BookReview_1 = __importDefault(require("../models/BookReview"));
function getBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield Book_1.default.findOne({ _id: req.params.id });
            if (book === null)
                return;
            const bookReviews = yield BookReview_1.default.find({ bookID: req.params.id }).populate("customerID", "username");
            const bookWithReviews = Object.assign(Object.assign({}, book.toObject()), { reviews: bookReviews });
            res.json({ book: bookWithReviews });
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.default = getBook;
