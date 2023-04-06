import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
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

const Book = mongoose.model("Book", BookSchema);
export default Book;