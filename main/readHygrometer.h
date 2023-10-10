void readHygrometer() {
  int analogValue = analogRead(HYGROMETERPIN);
  int hygro = map(analogValue, 1023, 350, 0, 100); //Read A0 value and map result
  sensorsValue.soilMoisture = hygro;

  Serial.print("Soil Moisture: ");
  Serial.print(hygro);
  Serial.print(" %");

  Serial.println();
}
