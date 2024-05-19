import { useAuth } from "@/services/auth/AuthContext";
import React from "react";
import HomePage from "./(tabs)";
import LoginPage from "./login-page";
const IndexPage = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <HomePage /> : <LoginPage />;
};

export default IndexPage;
