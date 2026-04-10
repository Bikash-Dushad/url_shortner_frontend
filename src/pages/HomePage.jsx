import React from "react";
import Navbar from "../components/Home/Navbar/Navbar";
import UrlShortnerForm from "../components/Home/UrlShortnerForm/UrlShortnerForm";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated}/>
      <UrlShortnerForm />
    </div>
  );
};

export default HomePage;
