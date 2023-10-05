#include "WiFiSSLClient.h"
#include "WiFiS3.h"
#include <ArduinoJson.h>
#include "DHT.h"
#include "arduino_secrets.h"

#include "models.h"

#include "utils.h"
#include "firebase.h"
#include "connectionWifiManager.h"
#include "read_temp_hum.h"





void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ;  // wait for serial port to connect. Needed for native USB port only
  }


  wifiConnection();

  // getConfiguration first time
  getConfiguration();

  // initializa sensors
  dht.begin();
}

void loop() {
  readSensors();
  manageActuators();
  sendLogSensors();
  

  
  delay(5000);
}

void readSensors() {

  // Temperature
  readTempHum();
}

void manageActuators() {
  
}