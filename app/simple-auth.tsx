import { useSupabase } from "@/infra/supabase/SupabaseContext";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

const SimpleAuth = () => {
  const { signInWithEmail, signUpWithEmail } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    const { user, error } = await signInWithEmail(email, password);

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUp() {
    setLoading(true);
    const { user, error } = await signUpWithEmail(email, password);

    if (error) Alert.alert(error.message);
    if (!user)
      //before it was session
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }
  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signIn()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUp()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
export default SimpleAuth;
