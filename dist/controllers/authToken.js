"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_js_1 = require("../utils/generateToken.js");
function authToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.sendStatus(401);
        const { username, date } = decoded;
        const user = { username, date };
        const accessToken = (0, generateToken_js_1.generateAccessToken)(user);
        res.json({ accessToken });
    });
}
exports.default = authToken;
