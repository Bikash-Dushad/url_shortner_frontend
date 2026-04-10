import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(true);

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

  const logout = () => {
  localStorage.removeItem("Urlshortnertoken");
  setToken(null);
};

  const value = {
    token,
    setToken,
    isAuthenticated: !!token,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
