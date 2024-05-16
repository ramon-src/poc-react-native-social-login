import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { Button } from "react-native";

import * as WebBrowser from "expo-web-browser";

export default function NewTutorial() {
  WebBrowser.maybeCompleteAuthSession();

  const [userInfo, setUserInfo] = useState(null);

  //client IDs from .env
  const config = {
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_ID,
    // iosClientId: IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_ID,
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  console.log("request", request);
  console.log("response", response);

  const getUserInfo = async (token: string) => {
    //absent token
    if (!token) return;
    //present token
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      console.log("user", user);

      //store user information  in Asyncstorage
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Attempt to retrieve user information from AsyncStorage
      const userJSON = await AsyncStorage.getItem("user");

      if (userJSON) {
        // If user information is found in AsyncStorage, parse it and set it in the state
        setUserInfo(JSON.parse(userJSON));
      } else if (response?.type === "success") {
        // If no user information is found and the response type is "success" (assuming response is defined),
        // call getUserInfo with the access token from the response
        getUserInfo(response?.authentication?.accessToken || "");
      }
    } catch (error) {
      // Handle any errors that occur during AsyncStorage retrieval or other operations
      console.error("Error retrieving user data from AsyncStorage:", error);
    }
  };

  //add it to a useEffect with response as a dependency
  useEffect(() => {
    signInWithGoogle();
  }, [response]);

  //log the userInfo to see user details
  console.log("userinfo", JSON.stringify(userInfo));
  return (
    <Button
      title="sign in with google"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
