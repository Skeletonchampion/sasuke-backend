"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authRequiredMW(req, res, next) {
    var _a;
    const accessToken = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!accessToken)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.sendStatus(401);
        req.username = decoded === null || decoded === void 0 ? void 0 : decoded.username;
        next();
    });
}
exports.default = authRequiredMW;
