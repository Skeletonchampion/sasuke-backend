import mongoose from "mongoose";

const BookReviewSchema = new mongoose.Schema({
    bookID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
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
},
{
    collection: 'book_reviews'
});

const BookReview = mongoose.model("BookReview", BookReviewSchema);
export default BookReview;