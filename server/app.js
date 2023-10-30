const express = require("express");
// const mongoose = require('mongoose')
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = process.env.port;
// dotenv is a popular Node.js library used for managing configuration variables and environment-specific
// settings in web applications. It allows you to load environment variables from a .env
// file into the Node.js process.env object, making it easy to configure your application in different environments

dotenv.config({ path: "./config.env" });

require("./db/conn");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = require("./model/UserSchema");

// const router = require('./router/auth')

app.use(require("./router/auth"));

// const DB = process.env.DATABASE;
// mongoose.connect(DB).then(()=>{
//     console.log(`connection successfull`)
// }).catch((err)=>{
//     console.log(`connection is not established`)
// })

// const middleware = (req, res, next) => {
//   console.log("hello iam a middleware");
// };

// app.get('/', (req,res)=>{
//     res.send("Hello express");
// });

app.get("/contact", (req, res) => {
  res.cookie("test", "srujan");
  res.send("hello from contact page");
});
app.get("/about", (req, res) => {
  res.send("Hello about page");
});

app.get("/login", (req, res) => {
  const token = jwt.sign({ user: userObject }, "your-secret-key", {
    expiresIn: "1h",
  });
  console.log(token);
  res.json({
    success: true,
    message: "Login successful",
    token,
    redirect: "/mypage",
  });
});

app.get("/signup", (req, res) => {
  res.send("Hello sign up page");
});

app.listen(process.env.port, () => {
  console.log("express running in 5000 port");
});
