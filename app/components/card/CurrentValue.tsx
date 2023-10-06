import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Subtitle from "../text/Subtitle";
import { Crop } from "../../shared/types";
import tw from "../../tailwind";
import { db } from "../../lib/firebase.config";
import { ref, onValue } from "firebase/database";
import { capitalizeFirstLetter } from "../../utils/string";
import Ionicons from "@expo/vector-icons/Ionicons";
import SensorCard from "./SensorCard";

const CurrentValue = () => {
  const [currentCrop, setCurrentCrop] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<Crop | null>();

  useEffect(() => {
    const currentCrop = ref(db, "configuration/currentCrop");
    onValue(currentCrop, (snapshot) => {
      const data = snapshot.val();
      setCurrentCrop(data);
    });

    const currentValue = ref(db, "logs");
    onValue(currentValue, (snapshot) => {
      const data = snapshot.val();
      const logKeys = Object.keys(data);
      const lastLogKey = logKeys[logKeys.length - 1]; // Get the last key

      const lastLog = data[lastLogKey];
      setCurrentValue(lastLog);
    });
  }, []);

  return (
    <View style={tw.style("bg-white p-6 rounded-md")}>
      <Subtitle>Piantagione attuale</Subtitle>
      <Text style={tw.style("text-lg text-black mb-4")}>
        {capitalizeFirstLetter(currentCrop)}
      </Text>
      <Subtitle>Valori attuali</Subtitle>
      <View>
        {currentValue && (
          <View style={tw.style("gap-2 mt-2")}>
            <SensorCard
              iconName="water-outline"
              title="Umidità"
              value={`${currentValue.tempHum.hum.toPrecision(3)}%`}
            />

            <SensorCard
              iconName="thermometer-outline"
              title="Temperatura"
              value={`${currentValue.tempHum.temp.toPrecision(3)}%`}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default CurrentValue;
