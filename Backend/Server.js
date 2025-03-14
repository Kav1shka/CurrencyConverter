const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 8000 ;
console.log(PORT);~
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.URL, (err) => {
  if (err) throw err;
  console.log("MongoDB is connected...");
});

const authRoutes = require("./Routes/AuthRoute");
const transactionRoutes = require("./Routes/TransactionRoutes");

app.use("/auth", authRoutes);
app.use("/transaction", transactionRoutes);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});