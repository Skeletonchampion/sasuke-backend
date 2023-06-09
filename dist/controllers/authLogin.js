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
const Customer_js_1 = __importDefault(require("../models/Customer.js"));
const generateToken_js_1 = require("../utils/generateToken.js");
function authLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const customer = yield Customer_js_1.default.findOne({ username }).lean();
            if (!customer)
                return res.json({ err: "Wrong username or password!" });
            // bcrypt.compare(password, customer.password, (err, same) => {
            //     if (err) console.error(err);
            //     console.log(password, customer.password, same)
            //     if (!same) return res.json({ err: "Wrong username or password!" });
            //     const accessToken = generateAccessToken(customer);
            //     const refreshToken = generateRefreshToken(customer);
            //     res.cookie("refreshToken", refreshToken);
            //     res.json({ accessToken });
            // });
            if (password !== customer.password)
                return res.json({ err: "Wrong username or password!" });
            const accessToken = (0, generateToken_js_1.generateAccessToken)(customer);
            const refreshToken = (0, generateToken_js_1.generateRefreshToken)(customer);
            res.cookie("refreshToken", refreshToken);
            res.json({ accessToken });
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.default = authLogin;
