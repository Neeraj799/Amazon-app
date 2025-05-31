import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("Authorization"));
  const [authUser, setAuthUser] = useState(null);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");

      if (data.success) {
        setAuthUser(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      checkAuth;
    }
  }, [token]);

  const signup = async (credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/signup`, credentials);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/login`, credentials);
      if (data.success) {
        setAuthUser(data.user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setToken(data.token);
        localStorage.setItem("Authorization", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("Authorization");
    setToken(null);
    setAuthUser(null);
    axios.defaults.headers.common["Authorization"] = null;
    toast.success("Logged out successfully");
  };

  const value = {
    axios,
    authUser,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
