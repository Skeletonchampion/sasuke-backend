"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(customer) {
    return jsonwebtoken_1.default.sign(customer, process.env.ACCESS_TOKEN_SECRET);
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(customer) {
    return jsonwebtoken_1.default.sign(customer, process.env.REFRESH_TOKEN_SECRET);
}
exports.generateRefreshToken = generateRefreshToken;
