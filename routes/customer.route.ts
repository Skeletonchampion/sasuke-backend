import express from "express";
import customerAddItemToCart from "../controllers/customerAddItemToCart";
import customerRemoveItemFromCart from "../controllers/customerRemoveItemFromCart";
import customerUpdateDetails from "../controllers/customerUpdateDetails";
import customerPlaceOrder from "../controllers/customerPlaceOrder";
import customerAddReview from "../controllers/customerAddReview";
import getCustomerOrders from "../controllers/getCustomerOrders";
import getCustomerReviews from "../controllers/getCustomerReviews";

const router = express.Router();

router
 .post("/orders", getCustomerOrders)
 .post("/reviews", getCustomerReviews)
 .post("/cart/add", customerAddItemToCart)
 .post("/cart/remove", customerRemoveItemFromCart)
 .post("/details/update", customerUpdateDetails)
 .post("/order", customerPlaceOrder)
 .post("/reviews/add", customerAddReview);

export default router;