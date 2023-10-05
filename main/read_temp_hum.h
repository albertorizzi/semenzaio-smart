void readTempHum() {
  TempHum values;

  values.hum = dht.readHumidity();
  values.temp = dht.readTemperature();

  if (isnan(values.hum) || isnan(values.temp)) {
    Serial.println(F("Failed to read from DHT sensor!"));
  }

  sensorsValue.tempHum = values;
  Serial.print("Hum: ");
  Serial.print(values.hum);
  Serial.print(" %");

  Serial.println();

  Serial.print("Temp: ");
  Serial.print(values.temp);
  Serial.print(" C");

  Serial.println();
}