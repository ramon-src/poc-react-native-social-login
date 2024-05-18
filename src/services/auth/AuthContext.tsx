import { supabase } from "@/infra/supabase";
import { Session } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  logOut: () => Promise<void>;
};
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  logOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    supabase.auth.getSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function logOut() {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setIsLoggedIn(false);
    } catch (error) {}
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
