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
const BookReview_1 = __importDefault(require("../models/BookReview"));
function getCustomerReviews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customerID = req.body.customerID;
            if (!customerID)
                res.status(404).json({ message: "No customerID!" });
            const customerReviews = yield BookReview_1.default.find({ customerID })
                .populate('bookID')
                .sort({ createdAt: -1 });
            res.json(customerReviews);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.default = getCustomerReviews;
