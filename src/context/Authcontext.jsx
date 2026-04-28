import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchData } from "../api/apiService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("Urlshortnertoken");
      setToken(storedToken);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setTokenLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setProfileLoading(false);

      return;
    }
    setProfileLoading(true);

    const getUserProfile = async () => {
      try {
        const response = await fetchData("/my-profile");
        if (response?.responseCode === 200) {
          setUserDetails(response.data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setProfileLoading(false);
      }
    };
    getUserProfile();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("Urlshortnertoken");
    setToken(null);
    setUserDetails(null);
  };

  const value = {
    token,
    setToken,
    isAuthenticated: !!token,
    logout,
    userDetails,
    profileLoading,
    tokenLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
