import { createContext, useContext } from "react";

import { User } from "@supabase/supabase-js";
import { supabase } from ".";

type SupabaseContextType = {
  getGoogleOAuthUrl: () => Promise<string | null>;
  signInWithIdToken: (idToken: string) => Promise<User | null>;
};
export const SupabaseContext = createContext<SupabaseContextType>({
  getGoogleOAuthUrl: async () => "",
  signInWithIdToken: async () => null,
});
export const useSupabase = () => useContext(SupabaseContext);
type SupabaseProviderProps = {
  children: React.ReactNode;
};
export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  async function signInWithIdToken(idToken: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });

    if (error) {
      console.log("error", error);
      return null;
    }
    console.log("data", data);
    return data.session.user ?? null;
  }

  async function getGoogleOAuthUrl(): Promise<string | null> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "com.reactnative.rnpocqrcode://(tabs)/",
      },
    });
    console.log("google auth response", data);

    return data.url;
  }

  return (
    <SupabaseContext.Provider
      value={{
        getGoogleOAuthUrl,
        signInWithIdToken,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};
