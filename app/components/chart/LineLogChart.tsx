import { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { db } from "../../lib/firebase.config";
import { onValue, ref } from "firebase/database";
import { Log } from "../../shared/types";
import { Dimensions, View } from "react-native";
import tw from "../../tailwind";
import Subtitle from "../text/Subtitle";

function LineLogChart() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const currentCrop = ref(db, "logs");
    onValue(currentCrop, (snapshot) => {
      const data = snapshot.val();
      setLogs(Object.values(data));
      console.log(Object.values(data));
    });
  }, []);

  return (

    <View style={tw.style("flex flex-row justify-center relative")}>
       
      <LineChart
        data={{
          labels: logs.map((log) => new Date(log.timestamp).toLocaleTimeString("it-IT")),
          datasets: [
            {
              data: logs.map((log) => log.tempHum.temp),
            },
          ],
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={320}

        yAxisSuffix="°C"
        yAxisInterval={1} // optional, defaults to 1
        
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={tw.style("my-4 rounded-md")}
      />
    </View>

  );
}

export default LineLogChart;
