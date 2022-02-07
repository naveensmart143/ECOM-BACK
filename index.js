const express = require("express");
const graphqlhttp = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
const Schemas = require("./Graphql/Schemas/index");
const RootValues = require("./Graphql/RootValues/index");
const isAuth = require("./MiddleWare/isAuth");
const PORT = 5000;
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  "/root",
  graphqlhttp({
    schema: Schemas,
    rootValue: RootValues,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("it will work");
});
mongoose
  .connect(
    `mongodb+srv://prashanth1:naveen@cluster0.4vhqk.mongodb.net/ECOM?retryWrites=true&w=majority`
  )

  .then(() => {
    app.listen(PORT, () => {
      console.log("It may work");
    });
  })
  .catch((err) => {
    throw err;
  });
