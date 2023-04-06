import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route";
import booksRouter from "./routes/books.route";
import customerRouter from "./routes/customer.route";

const DB_URL = process.env["DB_URL"];
mongoose.connect(DB_URL!);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ["set-cookie"],
}));

app.use("/auth", authRouter);
app.use("/books", booksRouter);
app.use("/customer", customerRouter);

app.get("/", (req, res) => {
    res.send("okay");
});

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});