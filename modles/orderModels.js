const mongoose = require( "mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    payment_id: {
      type:String,
    },
    order_id:{
      type:String,
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

const OrderModels = mongoose.model('Order', orderSchema);

module.exports = OrderModels;