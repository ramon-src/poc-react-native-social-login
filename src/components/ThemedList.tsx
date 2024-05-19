import { useThemeColor } from "@/hooks/useThemeColor";
import { FlatList, FlatListProps, StyleSheet } from "react-native";
type ThemedListProps = FlatListProps<any> & {
  lightColor?: string;
  darkColor?: string;
};
export function ThemedList({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedListProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <FlatList style={[{ ...styles, backgroundColor }, style]} {...otherProps} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
