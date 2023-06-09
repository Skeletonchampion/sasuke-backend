"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const books_route_1 = __importDefault(require("./routes/books.route"));
const customer_route_1 = __importDefault(require("./routes/customer.route"));
const eventLog_route_1 = __importDefault(require("./routes/eventLog.route"));
const DB_URL = process.env["DB_URL"];
mongoose_1.default.connect(DB_URL);
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ["set-cookie"],
}));
app.use("/auth", auth_route_1.default);
app.use("/books", books_route_1.default);
app.use("/customer", customer_route_1.default);
app.use("/eventLog", eventLog_route_1.default);
app.get("/", (req, res) => {
    res.send("okay");
});
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
