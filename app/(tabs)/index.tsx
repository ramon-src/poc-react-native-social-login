import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { ThemedList } from "@/components/ThemedList";
import { getLinks } from "@/infra/supabase/links/getLinks";
import { useAuth } from "@/services/auth/AuthContext";

const mockList = [{ id: 1, link: "https://something.qrcode" }];

type QRCodeLinks = {
  id: number;
  link: string;
};
const HomePage = () => {
  const { logOut } = useAuth();
  const [list, setList] = useState([] as QRCodeLinks[]);

  useEffect(() => {
    QRCodeLinks();
  });

  async function QRCodeLinks() {
    const { data } = await getLinks();
    setList(data as QRCodeLinks[]);
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Link href="/">tiasdsda</Link>
      <ThemedList
        style={styles.listItem}
        data={list}
        renderItem={({ item }) => <Text>{item.link}</Text>}
      />
      <Button title="Log out" onPress={() => logOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 8,
    height: 60,
  },
});

export default HomePage;
