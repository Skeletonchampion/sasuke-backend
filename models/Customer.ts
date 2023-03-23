import mongoose from "mongoose";
import bcrypt from "bcrypt";

const CustomerSchema = new mongoose.Schema({
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
            validator: function (v: string) {
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
            validator: function (v: string) {
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
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) throw new Error();

        this.password = hash;
        next();
    });
});

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;