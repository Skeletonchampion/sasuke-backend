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
const Customer_1 = __importDefault(require("../models/Customer"));
const Order_1 = __importDefault(require("../models/Order"));
function customerPlaceOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customerID = req.body.customerID;
            const cart = req.body.cart;
            const totalPrice = req.body.totalPrice;
            const customer = yield Customer_1.default.findById(customerID);
            const order = yield Order_1.default.findById(customerID);
            if (!customer) {
                return res.json({ message: 'Customer not found!' });
            }
            if (!order) {
                const updatedCart = customer.cart.map((item) => {
                    return {
                        quantity: item.quantity,
                        book: item.bookID
                    };
                });
                yield Order_1.default.create({
                    customerID: customerID,
                    items: updatedCart,
                    totalPrice: totalPrice,
                });
            }
            const customerCart = customer.cart;
            const ids1 = new Set(customerCart.map(item => item.bookID));
            const ids2 = new Set(cart.map(item => item.bookID));
            const unique1 = customerCart.filter(item => !ids2.has(item.bookID));
            const unique2 = cart.filter(item => !ids1.has(item.bookID));
            const newCart = [...unique1, ...unique2];
            customer.cart = newCart;
            yield customer.save();
            return res.json({ message: "Successfully placeorder!" });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Error place order!',
                error: err.message
            });
        }
    });
}
exports.default = customerPlaceOrder;
