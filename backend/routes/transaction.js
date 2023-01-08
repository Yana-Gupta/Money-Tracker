const { Router } = require("express");
const transaction = require("../schema/transaction.js");

const router = Router();
router.post("/transaction", async (req, res) => {
  const newTransaction = await transaction({
    email: req.body.email,
    transactionType: req.body.transactionType,
    amount: req.body.amount,
    userType: req.body.userType,
    numberOfPeople: req.body.numberOfPeople,
  });
  newTransaction.save();
  console.log(newTransaction);
  res.sendStatus(201);
});

router.get("/transaction", async (req, res) => {
  console.log(req.query);
  const transactions = await transaction.find({ email: req.query.email });
  if (transactions) {
    res.send(transactions);
  } else {
    res.sendStatus(204);
  }
});

router.delete("/transaction", async (req, res) => {
  console.log(req.body);
  let deleted = await transaction.findByIdAndDelete(req.body.id);
  console.log(deleted);
  res.sendStatus(200);
});

router.put("/transaction", async (req, res) => {
  console.log(req.body);
  let updatedUser = await transaction.findByIdAndUpdate(req.body._id, {
    transactionType: req.body.transactionType,
    amount: req.body.amount,
    userType: req.body.userType,
    numberOfPeople: req.body.numberOfPeople,
  });
  console.log(updatedUser);
  if (updatedUser) {
    res.sendStatus(200);
  }
});

module.exports = router;
