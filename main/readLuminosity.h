void readLuminosity() {
  int analogValue = analogRead(LUMINOSITYPIN);

  int lum = map (analogValue, MIN_VALUE_LUMINOSITY, MAX_VALUE_LUMINOSITY, 100, 0);
  sensorsValue.luminosity = lum;

  Serial.print("Luminosity: ");
  Serial.print(lum);
  Serial.print(" %");

  Serial.println();

  Serial.print("Luminosity analog value: ");
  Serial.print(analogValue);
  Serial.println();
}