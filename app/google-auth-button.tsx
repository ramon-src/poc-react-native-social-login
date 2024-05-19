import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

import { useSupabase } from "@/infra/supabase/SupabaseContext";

export default function GoogleAuthButton() {
  const { signInWithIdToken } = useSupabase();

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_ID,
  });

  return GoogleSigninButton({
    size: GoogleSigninButton.Size.Wide,
    color: GoogleSigninButton.Color.Dark,
    onPress: async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        if (userInfo.idToken) {
          await signInWithIdToken(userInfo.idToken);
        } else {
          throw new Error("no ID token present!");
        }
      } catch (error: any) {
        console.log("error", error);
      }
    },
  });
}
