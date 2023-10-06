import { Stack, router } from "expo-router";
import { Button, StyleSheet, View } from "react-native";
import CurrentValue from "../components/card/CurrentValue";
import Title from "../components/text/Title";
import tw from "../tailwind";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Page() {
  return (
    <View style={tw.style('px-4 bg-primary flex-1')}>
      <Stack.Screen 
        options={{
          title: "Home",
          headerBackTitle : "Home",
          headerShown: false,
          
        }}
      />
      <View style={tw.style('flex flex-row items-center justify-between')}>
      <Title>Benvenuto</Title>
      <Ionicons onPress={()=>router.push("/settings")} name="settings-outline" size={28} color="white" />
      </View>
     <CurrentValue />
    </View>
  );
}
