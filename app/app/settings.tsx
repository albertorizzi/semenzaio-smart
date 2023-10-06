import { Stack } from "expo-router";
import {  Text, TextInput, View } from "react-native";
import tw from "../tailwind";
import CropDropdown from "../components/input/dropdown/CropDropdown";
import { useState } from "react";
import { ICrop, ICropSettingsKey } from "../shared/types";
import ButtonIcon from "../components/button/ButtonIcon";
import Modal from "react-native-modal";
import { validateCrop } from "../utils/input";
import { db } from "../lib/firebase.config";
import { ref, set } from "firebase/database";
import Toast from 'react-native-toast-message';

export default function Page() {
  const [crop, setCrop] = useState<ICrop | null>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [cropValueModified, setCropValueModified] =
    useState<ICropSettingsKey | null>();

  const saveCrop = () => {
    if (crop) {
      if (validateCrop(crop).ok) {
        set(ref(db, "configuration/crops/" + crop.name), crop.setting);
        set(ref(db, "configuration/currentCrop"), crop.name);
      } else {
        console.log(validateCrop(crop).error);
        Toast.show({
          type: 'error',
          text1: validateCrop(crop).error,
          position: 'bottom',
          
        });
      }
    }
  };

  const openModal = (cropName: ICropSettingsKey) => {
    setModalVisible(true);
    setCropValueModified(cropName);
  };

  // modifify specific attribute od crop state
  const modifyCrop = (attribute: ICropSettingsKey, value: any) => {
    if (attribute === "vegetativaPhase") {
      setCrop((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            setting: {
              ...prevState.setting,
              lightHours: {
                ...prevState.setting.lightHours,
                vegetativaPhase: parseInt(value),
              },
            },
          };
        }
        return prevState;
      });
      return;
    }

    if (attribute === "fiorituraPhase") {
      setCrop((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            setting: {
              ...prevState.setting,
              lightHours: {
                ...prevState.setting.lightHours,
                fiorituraPhase: parseInt(value),
              },
            },
          };
        }
        return prevState;
      });
      return;
    }

    setCrop((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          setting: {
            ...prevState.setting,
            [attribute]: parseInt(value),
          },
        };
      }
      return prevState;
    });
  };

  return (
    <View style={tw.style("bg-primary flex-1 p-4 h-full")}>
      
      <Stack.Screen
        options={{
          title: "Impostazioni",
          headerBackTitle: "Home",

        }}
      />
      <View style={tw.style("bg-white p-4 mb-4 rounded  relative")}>
        <Text style={tw.style("text-xl font-semibold text-black")}>
          Cambia coltura
        </Text>

        <Text style={tw.style("text mt-8 font-semibold text-black")}>
          Selezione coltura
        </Text>
        <CropDropdown setCrop={setCrop} crop={crop} />

        <Text style={tw.style("text font-semibold  mb-4 text-black")}>
          Settaggi coltura
        </Text>
        <View style={tw.style("flex gap-2")}>
          <ButtonIcon
            onPress={() => {
              openModal("humidity");
            }}
            title={"Umidità: " + crop?.setting.humidity.toPrecision(3) + "%"}
            rightIconName="chevron-forward"
            variant="white"
          />
          <ButtonIcon
            onPress={() => {
              openModal("temperature");
            }}
            title={
              "Temperatura: " + crop?.setting.temperature.toPrecision(3) + "°C"
            }
            rightIconName="chevron-forward"
            variant="white"
          />

          <ButtonIcon
            onPress={() => {
              openModal("vegetativaPhase");
            }}
            title={
              "Ore di luce vegetativa: " +
              crop?.setting.lightHours.vegetativaPhase
            }
            rightIconName="chevron-forward"
            variant="white"
          />

          <ButtonIcon
            onPress={() => {
              openModal("fiorituraPhase");
            }}
            title={
              "Ore di luce fioritura: " +
              crop?.setting.lightHours.fiorituraPhase
            }
            rightIconName="chevron-forward"
            variant="white"
          />

          <ButtonIcon
            onPress={() => {
              openModal("soilHumidity");
            }}
            title={
              "Umidità terreno: " +
              crop?.setting.soilHumidity.toPrecision(3) +
              "%"
            }
            rightIconName="chevron-forward"
            variant="white"
          />
        </View>
      </View>

      <ButtonIcon
        onPress={saveCrop}
        title={"Salva"}
        variant="secondary"
        rightIconName="save"
      />

      <Modal
        onBackdropPress={() => setModalVisible(false)}
        style={tw.style("justify-end mb-12")}
        isVisible={isModalVisible}
      >
        <View style={tw.style("bg-white rounded-lg p-4 flex gap-1")}>
          <Text style={tw.style("text-lg font-bold")}>
            Modifica: {cropValueModified}
          </Text>

          <TextInput
            inputMode="numeric"
            keyboardType="numeric"
            style={tw.style("border rounded-lg p-4")}
            onChangeText={(text) => {
              if (!parseInt(text)) return;
              if (cropValueModified) modifyCrop(cropValueModified, text);
            }}
          />

          <ButtonIcon
            onPress={() => setModalVisible(false)}
            title="Salva"
            variant="secondary"
          />
        </View>
      </Modal>
    </View>
  );
}
