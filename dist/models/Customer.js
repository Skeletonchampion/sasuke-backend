"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CustomerSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    fullname: {
        type: String,
        lowercase: true,
        default: ""
    },
    email: {
        type: String,
        lowercase: true,
        default: ""
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    cart: [{
            bookID: String,
            quantity: {
                type: Number,
                default: 0
            }
        }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: true
    }
});
// CustomerSchema.pre("save", function (next) {
//     bcrypt.hash(this.password, 10, (err, hash) => {
//         if (err) throw new Error();
//         this.password = hash;
//         next();
//     });
// });
const Customer = mongoose_1.default.model("Customer", CustomerSchema);
exports.default = Customer;
