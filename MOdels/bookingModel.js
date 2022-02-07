const mongoose = require("mongoose");
const schema = mongoose.Schema;

const shipping = {
  houseNo: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
};

const BookingSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      type: schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  shippingDetails: shipping,
  totalPrice: {
    type: Number,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Orders", BookingSchema);
