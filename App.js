const express = require("express");
const AuthRouter = require("./route/Auth");
const app = express();
const PrivateRoute=require('./route/privateRoute/verifyRoute')
require("dotenv/config");
const mongoose = require("mongoose");
app.use(express.json());
mongoose.connect(process.env.DB_CONNECT, (err) => {
  if (err) console.log(err.message);
  else console.log("DB has connected ...");
});

app.use("/user", AuthRouter);
app.use('/user/api',PrivateRoute)
app.listen(3000, () => console.log("Server is Running"));
