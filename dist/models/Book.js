"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookSchema = new mongoose_1.default.Schema({
    title: {
        type: String
    },
    authors: {
        type: [String]
    },
    imgUrl: {
        type: String
    },
    summary: {
        type: String
    },
    category: {
        type: String
    },
    details: {
        isbn10: {
            type: String
        },
        isbn13: {
            type: String
        },
        weight: {
            type: String
        },
        width: {
            type: String
        },
        height: {
            type: String
        },
        pages: {
            type: Number
        },
    },
    publisher: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    price: {
        type: Number
    }
});
const Book = mongoose_1.default.model("Book", BookSchema);
exports.default = Book;
