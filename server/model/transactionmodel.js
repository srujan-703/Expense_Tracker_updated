const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    TransactionName: {
      type: String,
      required: [true, "transaction name is mandatory"],
    },

    amount: {
      type: Number,
      required: [true, "amount is mandatory"],
    },

    category: {
      type: String,
      required: [true, "category is mandatory"],
    },
    description: {
      type: String,
      required: [true, "description is mandatory"],
    },
    date: {
      type: Date,
      required: [true, "date is mandatory"],
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;
