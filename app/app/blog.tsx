import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Blog",
          headerBackTitle : "Home",
        }}
      />
      <View style={styles.main}>
        <Text style={styles.title}>Blog</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
      <Link href={"/"}>Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
