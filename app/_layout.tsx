import { SupabaseProvider } from "@/infra/supabase/SupabaseContext";
import { AuthProvider } from "@/services/auth/AuthContext";
import { Stack } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
const Layout = () => {
  return (
    <SupabaseProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ title: "Home", headerShown: false }}
          />
        </Stack>
      </AuthProvider>
    </SupabaseProvider>
  );
};

export default Layout;
