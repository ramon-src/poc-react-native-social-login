import { createContext, useContext } from 'react';

import { supabase } from '.';

type SupabaseContextType = {
  getGoogleOAuthUrl: () => Promise<string | null>;
};
export const SupabaseContext = createContext<SupabaseContextType>({
  getGoogleOAuthUrl: async () => '',
});
export const useSupabase = () => useContext(SupabaseContext);
type SupabaseProviderProps = {
  children: React.ReactNode;
};
export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  async function getGoogleOAuthUrl(): Promise<string | null> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'com.reactnative.rnpocqrcode://(tabs)/',
      },
    });
    console.log('google auth response', data);

    return data.url;
  }

  return (
    <SupabaseContext.Provider
      value={{
        getGoogleOAuthUrl,
      }}>
      {children}
    </SupabaseContext.Provider>
  );
};
