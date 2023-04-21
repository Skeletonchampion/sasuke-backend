import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  items: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  isDelivered: {
    type: Boolean,
    default: false
  }
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;