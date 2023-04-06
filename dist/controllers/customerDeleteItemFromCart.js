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
function customerDeleteItemFromCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customerID = req.body.customerID;
            const bookID = req.body.bookID;
            const customer = yield Customer_1.default.findById(customerID);
            if (!customer) {
                return res.json({ message: 'Customer not found!' });
            }
            const existingCartItemIndex = customer.cart.findIndex((item) => item.bookID === bookID);
            if (existingCartItemIndex !== -1) {
                customer.cart.splice(existingCartItemIndex, 1);
            }
            yield customer.save();
            return res.json({ message: "Successful updating cart!" });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Error updating cart',
                error: err.message
            });
        }
    });
}
exports.default = customerDeleteItemFromCart;
