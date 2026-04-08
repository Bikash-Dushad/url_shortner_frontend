import React from "react";
import Navbar from "../components/Home/Navbar/Navbar";
import UrlShortnerForm from "../components/Home/UrlShortnerForm/UrlShortnerForm";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <UrlShortnerForm />
    </div>
  );
};

export default HomePage;
