const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
