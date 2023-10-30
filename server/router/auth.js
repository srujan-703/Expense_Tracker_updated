const express = require("express");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middleware/authenticate");

const router = express.Router();

const bcrypt = require("bcrypt");

require("../db/conn");
const User = require("../model/UserSchema");
const transactionmodel = require("../model/transactionmodel");
// router.get("/", (req, res) => {
//   res.send("Hello express from auth file");
// });

router.post("/transaction", (req, res) => {
  const { transactionName, amount, category, description, date } = req.body;

  if (!transactionName || !amount || !category || !description || !date) {
    console.log("Fill all the fields");
    return res.json({ error: "Fill all the fields properly" });
  }

  const amountPattern = /^[0-9]+$/;

  if (!amountPattern.test(amount)) {
    console.log("Enter only integer value in the amount field");
    return res.status(422).json({ error: "Invalid amount format" });
  }

  const newTransaction = new transactionmodel({
    TransactionName: transactionName,
    amount: amount,
    category: category,
    description: description,
    date: date,
  });

  newTransaction
    .save()
    .then(() => {
      res.status(201).json({ message: "Expense stored successfully" });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to add expense in the database" })
    );
});

router.get("/transactions", async (req, res) => {
  try {
    const { dateRange } = req.query;
    console.log(dateRange);
    // Calculate the start date based on the selected range
    let startDate = new Date();
    if (dateRange === "lastWeek") {
      startDate.setDate(startDate.getDate() - 7);
    } else if (dateRange === "lastMonth") {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (dateRange === "lastYear") {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }
    const transactions = await transactionmodel.find(
      dateRange === "all" ? {} : { date: { $gte: startDate } }
    );

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/data", async (req, res) => {
  try {
    const data = await transactionmodel.find(); // Replace with your model name
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register", (req, res) => {
  const { name, email, number, password, cpassword } = req.body;

  if (!name || !email || !number || !password || !cpassword) {
    return res.json({ error: "fill all the fields properly" });
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!emailPattern.test(email)) {
    return res.status(422).json({ error: "Invalid email format" });
  }

  if (password) {
    const x = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!x.test(password)) {
      return res.json({ error: "Please enter a strong password" });
    }
  }

  if (password != cpassword) {
    return res.json({
      error: "password and confirm password are not matching",
    });
  }

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Email already exists" });
      }
      const user = new User({ name, email, number, password, cpassword });

      user
        .save()
        .then(() => {
          // if (!res.ok) {
          //   throw new Error("request failed");
          // }
          res.status(201).json({ message: "data registered successfully" });
          // window.location.reload();
        })
        .catch((err) => res.status(500).json({ error: "Failed to register" }));
    })
    .catch((err) => {
      console.log(err);
      // const errorData = response.json(); // Parse the error response

      // if (errorData && errorData.errors) {
      //   // Loop through the error fields and clear them
      //   for (const fieldName in errorData.errors) {
      //     const errorField = document.getElementById(fieldName);
      //     if (errorField) {
      //       errorField.value = ""; // Clear the field
      //     }
      // }
      // }
    });
  // left side values are from database(saving in the database as keys) and right side values are
  // from user filled values
});

// router.post("/login", async (req, res) => {
//   try {
//     let token;
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "please fill the data" });
//     }
//     const userLogin = await User.findOne({ email: email });
//     if (userLogin) {
//       // console.log(userLogin);
//       const isMatch = await bcrypt.compare(password, userLogin.password);
//       token = await userLogin.generateAuthToken();
//       res.cookie("jwtoken", token, {
//         expires: new Date(Date.now() + 25892000000),
//         httpOnly: true,
//       });
//       if (!isMatch) {
//         res.json({ error: "error" });
//       } else {
//         console.log("srujan login");
//         res.json({ error: "done successfully" });
//         window.alert("welcome" + userLogin.name);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all the fields." });
    }

    const userLogin = await User.findOne({ email: email });

    if (!userLogin) {
      return res.status(400).json({ error: "Invalid Login" });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Login" });
    }

    token = await userLogin.generateAuthToken();

    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    // Instead of using window.alert, you should return a success response
    res.json({ status: 200, message: "Login successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const transactionId = req.params.id;
  try {
    // Use your database model to delete the transaction by ID
    await transactionmodel.findByIdAndDelete(transactionId);
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

router.get("/about", Authenticate, (req, res) => {
  console.log(`Hello about my page`);
  res.send(req.rootUser);
});

module.exports = router;
