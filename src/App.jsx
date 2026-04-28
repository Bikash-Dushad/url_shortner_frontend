import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import MyurlsPage from "./pages/MyurlsPage";
import SigninPage from "./pages/SigninPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/myurls" element={<MyurlsPage />} />
      </Routes>
    </>
  );
}

export default App;
