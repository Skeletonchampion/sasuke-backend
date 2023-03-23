import express from "express";

import authRegister from "../controllers/authRegister.js";
import authLogin from "../controllers/authLogin.js";
import authToken from "../controllers/authToken";

const router = express.Router();

router
 .post("/register", authRegister)
 .post("/login", authLogin)
 .post("/token", authToken)

export default router;