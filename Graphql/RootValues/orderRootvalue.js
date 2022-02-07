const Order = require("../../MOdels/bookingModel");
const User = require("../../MOdels/userMOdel");
const Product = require("../../MOdels/productModel");

const fetchUser = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    return { ...user._doc };
  } catch (err) {
    throw err;
  }
};

const fetchProducts = async (productIds) => {
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    products.map((product) => {
      return { ...product._doc };
    });
    return products;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Orders: async () => {
    try {
      const orders = await Order.find();
      return orders.map((item) => {
        return {
          ...item._doc,
          user: fetchUser.bind(this, item._doc.user),
          orderItems: fetchProducts.bind(this, item._doc.orderItems),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  addToCart: async (args, req) => {
    try {
      const userCheck = await Order.findOne({
        user: req.userId,
      });
      // console.log(userCheck);
      if (!userCheck) {
        const order = new Order({
          user: req.userId,
          orderItems: args.productId,
        });
        const result = await order.save();
        return {
          ...result._doc,
          user: fetchUser.bind(this, result._doc.user),
          orderItems: fetchProducts.bind(this, result._doc.orderItems),
        };
      } else {
        userCheck.orderItems.push(args.productId);
        const updated = await userCheck.save();
        return {
          ...updated._doc,
          user: fetchUser.bind(this, updated._doc.user),
          orderItems: fetchProducts.bind(this, updated._doc.orderItems),
        };
      }
    } catch (err) {
      throw err;
    }
  },

  shipping: async (args, req) => {
    const shipping = {
      houseNo: args.ShippingInput.houseNo,
      phone: args.ShippingInput.phone,
      address: args.ShippingInput.address,
    };

    const userCheck = await Order.findOne({ id: req.userId });
    userCheck.shippingDetails = shipping;

    const updated = await userCheck.save();
    return {
      ...updated._doc,
      user: fetchUser.bind(this, updated._doc.user),
      orderItems: fetchProducts.bind(this, updated._doc.orderItems),
    };
  },
  deleteCart: async ({ productId }, req) => {
    const userCheck = await Order.findOne({ id: req.userId });
    if (!userCheck) {
      throw new Error("no user with that id");
    }
    userCheck.orderItems.pull(productId);
    const updated = await userCheck.save();
    return {
      ...updated._doc,
      user: fetchUser.bind(this, updated._doc.user),
      orderItems: fetchProducts.bind(this, updated._doc.orderItems),
    };
  },
};
