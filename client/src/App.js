import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Signin from "./components/Signin";
import Home from "./components/Home";
import Login from "./components/Login";
import Contact from "./components/Contact";
import { Routes, Route } from "react-router-dom";
import Mypage from "./components/Mypage";
import React from "react";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
      </Routes>
    </>
  );
}

export default App;
