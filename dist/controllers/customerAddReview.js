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
function customerAddReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { bookID, customerID, comment, rating } = req.body;
            const body = Object.assign(Object.assign({}, req.body), { createdAt: new Date() });
            yield BookReview_1.default.create(body);
            return res.json({ message: "Successful adding review!" });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Error adding review!',
                error: err.message
            });
        }
    });
}
exports.default = customerAddReview;
