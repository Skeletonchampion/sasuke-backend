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
const express_1 = __importDefault(require("express"));
const customerAddItemToCart_1 = __importDefault(require("../controllers/customerAddItemToCart"));
const customerRemoveItemFromCart_1 = __importDefault(require("../controllers/customerRemoveItemFromCart"));
const customerUpdateDetails_1 = __importDefault(require("../controllers/customerUpdateDetails"));
const customerPlaceOrder_1 = __importDefault(require("../controllers/customerPlaceOrder"));
const customerAddReview_1 = __importDefault(require("../controllers/customerAddReview"));
const getCustomerOrders_1 = __importDefault(require("../controllers/getCustomerOrders"));
const getCustomerReviews_1 = __importDefault(require("../controllers/getCustomerReviews"));
const mongoose_1 = __importDefault(require("mongoose"));
const Order_1 = __importDefault(require("../models/Order"));
const { ObjectId } = mongoose_1.default.Types;
const router = express_1.default.Router();
router
    // .post("/username", getCustomerUsername)
    .post("/order", getCustomerOrder)
    .post("/orders", getCustomerOrders_1.default)
    .post("/reviews", getCustomerReviews_1.default)
    .post("/cart/add", customerAddItemToCart_1.default)
    .post("/cart/remove", customerRemoveItemFromCart_1.default)
    .post("/details/update", customerUpdateDetails_1.default)
    .post("/placeorder", customerPlaceOrder_1.default)
    .post("/reviews/add", customerAddReview_1.default);
function getCustomerOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { customerID, orderID } = req.body;
            if (!customerID)
                res.status(404).json({ message: "No customerID!" });
            const customerOrders = yield Order_1.default.findOne({ customerID: new ObjectId(customerID), _id: new ObjectId(orderID) }).populate('items.book');
            res.json(customerOrders);
        }
        catch (err) {
            console.log(err);
        }
    });
}
// async function getCustomerUsername(req: Request, res: Response) {
//     try {
//         const customerID = req.body.customerID;
//         if (!customerID) res.status(404).json({ message: "No customerID!" })
//         const customer = await Customer.findOne({ customerID }).lean();
//         const { username } = customer;
//         res.json(username);
//     }
//     catch (err: any) {
//         console.log(err);
//     }
// }
exports.default = router;
