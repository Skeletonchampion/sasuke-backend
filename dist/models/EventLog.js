"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const eventLogSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    log: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});
const EventLog = mongoose_1.default.model('EventLog', eventLogSchema);
exports.default = EventLog;
