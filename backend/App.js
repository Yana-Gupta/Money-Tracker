const express = require("express");
const cors = require("cors");
const PORT = 4000;
const mongo = require("./config/mongo.js");
const registerRoute = require("./routes/register.js");
const loginRoute = require("./routes/login.js");
const transactionRoute = require("./routes/transaction.js");
mongo();
const app = express();
app.use(cors());
app.use(express.json());
app.use("", cors(), registerRoute);
app.use("", cors(), loginRoute);
app.use("", cors(), transactionRoute);

app.listen(PORT, function () {
  console.log(`App running at http://localhost:${PORT}`);
});

app.get("", (req, res) => {
  res.send("");
});
