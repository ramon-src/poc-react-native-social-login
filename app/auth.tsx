import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native";

import { useSupabase } from "@/infra/supabase/SupabaseContext";
export default function GoogleAuthButton() {
  const { getGoogleOAuthUrl } = useSupabase();

  const signInWithGoogle = async () => {
    const url = (await getGoogleOAuthUrl()) ?? "";

    console.log("google auth url", url);
    //https://ymimjclkytdjziuwkeci.supabase.co/auth/v1/authorize?provider=google
    const result = await WebBrowser.openAuthSessionAsync(
      url,
      `com.reactnative.rnpocqrcode://home/`,
      {
        showInRecents: true,
      }
    );
    console.log("result", result);
  };

  return (
    <>
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
    </>
  );
}
