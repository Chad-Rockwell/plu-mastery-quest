import { StyleSheet, Text, View } from "react-native";
import App from "../App";

export default function Page() {
  return (
    <View style={styles.container}>
      <App></App>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
