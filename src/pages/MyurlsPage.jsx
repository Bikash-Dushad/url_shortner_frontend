import React from "react";
import MyUrls from "../components/Home/Myurls/Myurls";
import Navbar from "../components/Home/Navbar/Navbar";
import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";

const MyurlsPage = () => {
  const { isAuthenticated, logout, userDetails, profileLoading } =
    useContext(AuthContext);
  return (
    <div>
      <Navbar
        isAuthenticated={isAuthenticated}
        logout={logout}
        userName={userDetails?.name}
      />
      <MyUrls />
    </div>
  );
};

export default MyurlsPage;
