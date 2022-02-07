const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../MOdels/userMOdel");

module.exports = {
  signUp: async (args) => {
    try {
      const emailExist = await User.findOne({
        email: args.UserInput.email,
      });
      if (emailExist) {
        throw new Error("email exists");
      }
      const hashedPassword = await bcrypt.hash(args.UserInput.password, 12);
      const user = new User({
        fullname: args.UserInput.fullname,
        email: args.UserInput.email,
        password: hashedPassword,
      });

      const results = await user.save();
      const newUserId = results._doc;
      // console.log(results._doc._id);
      const token = jwt.sign(
        { user: newUserId._id, email: newUserId.email },
        "superkey",
        { expiresIn: "1h" }
      );
      return { userId: newUserId._id, token: token, ExpirationIn: 1 };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("no user with that email");
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new Error("Password incorrect");
    }
    const token = jwt.sign({ user: user.id, email: user.email }, "superkey", {
      expiresIn: "1h",
    });
    return { userId: user.id, token: token, ExpirationIn: 1 };
  },
};
