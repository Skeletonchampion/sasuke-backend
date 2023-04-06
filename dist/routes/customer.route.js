"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerAddItemToCart_1 = __importDefault(require("../controllers/customerAddItemToCart"));
const customerRemoveItemFromCart_1 = __importDefault(require("../controllers/customerRemoveItemFromCart"));
const customerUpdateDetails_1 = __importDefault(require("../controllers/customerUpdateDetails"));
const customerPlaceOrder_1 = __importDefault(require("../controllers/customerPlaceOrder"));
const router = express_1.default.Router();
router
    .post("/cart/add", customerAddItemToCart_1.default)
    .post("/cart/remove", customerRemoveItemFromCart_1.default)
    .post("/details/update", customerUpdateDetails_1.default)
    .post("/order", customerPlaceOrder_1.default);
exports.default = router;
