"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookReviewSchema = new mongoose_1.default.Schema({
    bookID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    customerID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        minlength: 20
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
}, {
    collection: 'book_reviews'
});
const BookReview = mongoose_1.default.model("BookReview", BookReviewSchema);
exports.default = BookReview;
