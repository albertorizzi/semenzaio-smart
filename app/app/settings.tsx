import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import tw from "../tailwind";

export default function Page() {
  return (
    <View style={tw.style('bg-primary flex-1 p-4')}>
      <Stack.Screen
        options={{
          title: "Impostazioni",
          headerBackTitle : "Home",
          
        }}
      />
      <View style={tw.style("bg-white p-4 rounded")}>
        <Text style={tw.style('text-xl font-semibold text-black')}>Cambia coltura</Text>
      </View>
    </View>
  );
}
