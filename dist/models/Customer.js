"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    email: {
        type: String,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        minlength: 10,
        maxlength: 10,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: 'Phone number must be 10 digits'
        }
    },
    address: {
        type: String,
        minlength: 10,
        maxlength: 255,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9\s]+$/.test(v);
            },
            message: 'Address must be alphanumeric'
        }
    },
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
CustomerSchema.pre("save", function (next) {
    bcrypt_1.default.hash(this.password, 10, (err, hash) => {
        if (err)
            throw new Error();
        this.password = hash;
        next();
    });
});
const Customer = mongoose_1.default.model("Customer", CustomerSchema);
exports.default = Customer;
