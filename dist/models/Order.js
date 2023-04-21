"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    customerID: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    items: [{
            book: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Book'
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
    totalPrice: {
        type: Number,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false
    }
});
const Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;
