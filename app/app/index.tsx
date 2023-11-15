import { Stack, router } from "expo-router";
import { Button, ScrollView, StyleSheet, Switch, View } from "react-native";
import CurrentValue from "../components/card/CurrentValue";
import Title from "../components/text/Title";
import tw from "../tailwind";
import Ionicons from '@expo/vector-icons/Ionicons';
import LineLogChart from "../components/chart/LineLogChart";
import Subtitle from "../components/text/Subtitle";
import { useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { db } from "../lib/firebase.config";

export default function Page() {


  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = async() => {
    try {
      const ipAddress = ref(db, "configuration/ipAddress");
      onValue(ipAddress, async (snapshot) => {
        const data = snapshot.val();
        console.log(data)
      if (data) {
        setIsEnabled(!isEnabled)
        await fetch(`http://${data}/fan/${isEnabled ? "OFF" : "ON"}}`)
      }
    }
    );
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }
  return (
    <ScrollView style={tw.style('bg-primary')}>

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
     <View style={tw.style("bg-white p-6 rounded-md mt-4")}>
     <Subtitle>Ventola</Subtitle>
     <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={"#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        style={tw.style('mb-4')}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
      </View>




      


    </ScrollView>
  );
}
