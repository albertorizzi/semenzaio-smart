import { Stack, router } from "expo-router";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import CurrentValue from "../components/card/CurrentValue";
import Title from "../components/text/Title";
import tw from "../tailwind";
import Ionicons from '@expo/vector-icons/Ionicons';
import LineLogChart from "../components/chart/LineLogChart";
import Subtitle from "../components/text/Subtitle";

export default function Page() {
  return (
    <ScrollView style={tw.style('bg-primary min-h-screen')}>

      <Stack.Screen 
        options={{
          title: "Home",
          headerBackTitle : "Home",
          headerShown: false,
          
        }}
      />
      <View style={tw.style('bg-primary p-4')}>
      <View style={tw.style('flex flex-row items-center justify-between')}>
      <Title>Benvenuto</Title>
      <Ionicons onPress={()=>router.push("/settings")} name="settings-outline" size={28} color="white" />
      </View>
     <CurrentValue />
      </View>

     <LineLogChart />

  

    </ScrollView>
  );
}
