"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRegister_js_1 = __importDefault(require("../controllers/authRegister.js"));
const authLogin_js_1 = __importDefault(require("../controllers/authLogin.js"));
const authToken_1 = __importDefault(require("../controllers/authToken"));
const router = express_1.default.Router();
router
    .post("/register", authRegister_js_1.default)
    .post("/login", authLogin_js_1.default)
    .post("/token", authToken_1.default);
exports.default = router;
