import express from "express";
import customerAddItemToCart from "../controllers/customerAddItemToCart";
import customerRemoveItemFromCart from "../controllers/customerRemoveItemFromCart";
import customerUpdateDetails from "../controllers/customerUpdateDetails";
import customerPlaceOrder from "../controllers/customerPlaceOrder";

const router = express.Router();

router
 .post("/cart/add", customerAddItemToCart)
 .post("/cart/remove", customerRemoveItemFromCart)
 .post("/details/update", customerUpdateDetails)
 .post("/order", customerPlaceOrder);

export default router;