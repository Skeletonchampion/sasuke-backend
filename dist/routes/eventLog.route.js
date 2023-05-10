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
const express_1 = __importDefault(require("express"));
const Book_1 = __importDefault(require("../models/Book"));
const Customer_1 = __importDefault(require("../models/Customer"));
const EventLog_1 = __importDefault(require("../models/EventLog"));
const Order_1 = __importDefault(require("../models/Order"));
const getEventEmiter_1 = __importDefault(require("../utils/getEventEmiter"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        });
        res.write(`event: message\ndata: connected\n\n`);
        function eventListener(eventLog) {
            try {
                res.write(`event: message\ndata: ${JSON.stringify(eventLog)}\n\n`);
            }
            catch (error) {
                console.error(error);
            }
        }
        getEventEmiter_1.default.on('message', eventListener);
        res.on('close', () => {
            getEventEmiter_1.default.removeListener('message', eventListener);
        });
    }
    catch (err) {
        console.error(err);
    }
}));
router.get("/data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalProfitArray = yield Order_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: "$totalPrice" }
                }
            }
        ]);
        const totalProfit = totalProfitArray[0].totalPrice;
        const totalProducts = yield Book_1.default.find({}).count();
        const totalCustomers = yield Customer_1.default.find({}).count();
        const eventLogs = yield EventLog_1.default.find({}).sort({ date: -1 }).limit(10);
        res.json({ totalProfit, totalProducts, totalCustomers, eventLogs });
    }
    catch (err) {
        console.error(err);
    }
}));
exports.default = router;
