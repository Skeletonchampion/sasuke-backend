"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getBook_1 = __importDefault(require("../controllers/getBook"));
const getBooks_1 = __importDefault(require("../controllers/getBooks"));
const getBooksByCart_1 = __importDefault(require("../controllers/getBooksByCart"));
const getBooksByCategory_1 = __importDefault(require("../controllers/getBooksByCategory"));
const getBooksByQuery_1 = __importDefault(require("../controllers/getBooksByQuery"));
const router = express_1.default.Router();
router
    .get("/all", getBooks_1.default)
    .get("/id/:id", getBook_1.default)
    .get("/category/:category", getBooksByCategory_1.default)
    .get("/search/:query", getBooksByQuery_1.default)
    .get("/cart", getBooksByCart_1.default);
exports.default = router;
