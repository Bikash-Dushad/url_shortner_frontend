import Navbar from "../components/Home/Navbar/Navbar";
import UrlShortnerForm from "../components/Home/UrlShortnerForm/UrlShortnerForm";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";

const HomePage = () => {
  const { isAuthenticated, logout, userDetails, profileLoading } =
    useContext(AuthContext);

  return (
    <div>
      <Navbar
        isAuthenticated={isAuthenticated}
        logout={logout}
        userName={userDetails?.name} // ✅ FIX
      />

      {profileLoading ? (
        <p>Loading profile...</p>
      ) : (
        <UrlShortnerForm isAuthenticated={isAuthenticated} />
      )}
    </div>
  );
};

export default HomePage;
