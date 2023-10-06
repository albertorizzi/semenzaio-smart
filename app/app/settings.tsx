import { Stack } from "expo-router";
import { Button, Text, View } from "react-native";
import tw from "../tailwind";
import DropdownSelect from 'react-native-input-select';
import CropDropdown from "../components/input/dropdown/CropDropdown";
import { useState } from "react";
import { ICrop } from "../shared/types";

export default function Page() {

  const [crop, setCrop] = useState<ICrop | null>();

  return (
    <View style={tw.style('bg-primary flex-1 p-4 h-full')}>
      <Stack.Screen
        options={{
          title: "Impostazioni",
          headerBackTitle : "Home",
          
        }}
      />
      <View style={tw.style("bg-white p-4 rounded  relative")}>
        <Text style={tw.style('text-xl font-semibold text-black')}>Cambia coltura</Text>
       
        <CropDropdown 
           setCrop={setCrop}
           crop={crop}
        />
       <Button title="Salva"/>

      </View>
    </View>

  );
}
