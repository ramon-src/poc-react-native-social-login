import { useAuth } from "@/services/auth/AuthContext";
import React from "react";
import { StyleSheet } from "react-native";
import HomePage from "./(tabs)";
import LoginPage from "./login-page";
const IndexPage = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <HomePage /> : <LoginPage />;
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    height: 60,
    width: 300,
    marginTop: 20,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default IndexPage;
