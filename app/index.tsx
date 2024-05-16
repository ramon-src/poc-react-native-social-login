import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import NewTutorial from "./new-tutorial";

const IndexPage = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>dsasd</Text>
      <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} />
      <Pressable style={styles.button} onPress={() => router.push("/(tabs)")}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push("/(tabs)")}>
        <Text style={styles.text}>x</Text>
      </Pressable>
      <NewTutorial />
    </View>
  );
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
