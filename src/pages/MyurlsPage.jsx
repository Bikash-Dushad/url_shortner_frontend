import React from "react";
import MyUrls from "../components/Home/MyUrls/MyUrls";
import Navbar from "../components/Home/Navbar/Navbar";
import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";

const MyurlsPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <MyUrls />
    </div>
  );
};

export default MyurlsPage;
