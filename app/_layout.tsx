import { SupabaseProvider } from "@/infra/supabase/SupabaseContext";
import { Stack } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
const Layout = () => {
  return (
    <SupabaseProvider>
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
    </SupabaseProvider>
  );
};

export default Layout;
