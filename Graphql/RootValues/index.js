const orderRoot = require("./orderRootvalue");
const productRoot = require("./productsRootValue");
const userRoot = require("./userRootvalue");

const rootvalues = {
  ...orderRoot,
  ...productRoot,
  ...userRoot,
};

module.exports = rootvalues;
