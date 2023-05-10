"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitEvent = void 0;
const getEventEmiter_1 = __importDefault(require("./getEventEmiter"));
function emitEvent(eventLog) {
    getEventEmiter_1.default.emit('message', eventLog);
}
exports.emitEvent = emitEvent;
