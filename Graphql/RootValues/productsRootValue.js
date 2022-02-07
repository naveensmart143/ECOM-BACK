const Product = require("../../MOdels/productModel");

module.exports = {
  products: async () => {
    try {
      const product = await Product.find();
      return product.map((item) => {
        return { ...item._doc };
      });
    } catch (err) {
      throw err;
    }
  },
  createProduct: async (args) => {
    try {
      const newProduct = new Product({
        name: args.ProductInput.name,
        image: args.ProductInput.image,
        description: args.ProductInput.description,
        price: args.ProductInput.price,
        category: args.ProductInput.category,
        count: args.ProductInput.count,
      });
      const result = await newProduct.save();
      return { ...result._doc };
    } catch (err) {
      throw err;
    }
  },
};
