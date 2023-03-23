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
const Customer_1 = __importDefault(require("../models/Customer"));
function authRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const user = yield Customer_1.default.findOne({ username });
            if (username.length < 4)
                return res.json({ err: "Username's length need to be larger than 4!" });
            if (password.length < 6)
                return res.json({ err: "Password's length need to be larger than 6!" });
            if (user) {
                return res.json({ err: "This username's already be taken!" });
            }
            yield Customer_1.default.create(req.body);
            res.json({ message: "Successfully Registered!" });
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.default = authRegister;
