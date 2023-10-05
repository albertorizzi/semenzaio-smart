import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentValue from "../components/card/CurrentValue";
import Title from "../components/text/Title";

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: "Home",
          headerBackTitle : "Home",
        }}
      />
      <Title>Benvenuto</Title>
     <CurrentValue />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: "#537b2f",
  },
  
});
