#include "WiFiSSLClient.h"
#include "WiFiS3.h"
#include <ArduinoJson.h>
#include "DHT.h"
#include "arduino_secrets.h"
#include "Arduino_LED_Matrix.h"

#include "models.h"

// #include "utils.h"
#include "firebase.h"
#include "connectionWifiManager.h"
#include "read_temp_hum.h"
#include "readLuminosity.h"
#include "readHygrometer.h"



WiFiServer server(80);



void setup() {

  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ;  // wait for serial port to connect. Needed for native USB port only
  }

  pinMode(HEATER_PIN, OUTPUT);
  pinMode(LIGHT_PIN, OUTPUT);
  pinMode(PUMP_PIN, OUTPUT);
  pinMode(FAN_PIN, OUTPUT);

  pinMode(LED_BUILTIN, OUTPUT);



  wifiConnection();

  // getConfiguration first time
  getConfiguration();

  // initializa sensors
  dht.begin();

  // active web server
  server.begin();
  matrix.begin();

    // ventola, PIN digital 6
  // sempre accesa per garantire che non ristagni unimità
  digitalWrite(FAN_PIN, ReleStatus::ON);

  // Tutti i relè spenti 
  digitalWrite(PUMP_PIN, ReleStatus::OFF);
  digitalWrite(LIGHT_PIN, ReleStatus::OFF);
  digitalWrite(LIGHT_PIN, ReleStatus::OFF);
}

void loop() {
  webServerManager();
  readSensors();
  manageActuators();
  sendLogSensors();

  delay(5000);
}

void readSensors() {

  // Temperature
  readTempHum();

  readLuminosity();

  readHygrometer();
}

void manageActuators() {
  // riscaldatore PIN Digital 3
  // se temperatura maggiore di quella della cultura allora spengo riscaldatore
  if (sensorsValue.tempHum.temp > cropConfiguration.temperature) {
    digitalWrite(HEATER_PIN, ReleStatus::OFF);
  } else {
    digitalWrite(HEATER_PIN, ReleStatus::ON);
  }

  // ligth percentage, PIN digital 4
  // se umidità suolo è maggiore di quella della cultura, allora spengo pompa
  Serial.print(cropConfiguration.lightPercentage);


  if (sensorsValue.luminosity > cropConfiguration.lightPercentage) {
    digitalWrite(LIGHT_PIN, ReleStatus::OFF);
  } else if (sensorsValue.luminosity < cropConfiguration.lightPercentage) {
    digitalWrite(LIGHT_PIN, ReleStatus::ON);
  }


  // umidità suolo, PIN digital 5
  // se umidità suolo è maggiore di quella della cultura, allora spengo pompa
  if (sensorsValue.soilMoisture > cropConfiguration.soilHumidity + 2) {
    digitalWrite(PUMP_PIN, ReleStatus::OFF);
  } else if (sensorsValue.soilMoisture < cropConfiguration.soilHumidity - 2) {
    digitalWrite(PUMP_PIN, ReleStatus::ON);
  }


}

void webServerManager() {
  WiFiClient client = server.available();  // listen for incoming clients

  if (client) {                    // if you get a client,
    Serial.println("new client");  // print a message out the serial port
    String currentLine = "";       // make a String to hold incoming data from the client
    while (client.connected()) {   // loop while the client's connected
      if (client.available()) {    // if there's bytes to read from the client,
        char c = client.read();    // read a byte, then
        Serial.write(c);           // print it out to the serial monitor
        if (c == '\n') {           // if the byte is a newline character

          // if the current line is blank, you got two newline characters in a row.
          // that's the end of the client HTTP request, so send a response:
          if (currentLine.length() == 0) {
            // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
            // and a content-type so the client knows what's coming, then a blank line:

            // break out of the while loop:
            break;
          } else {  // if you got a newline, then clear currentLine:
            currentLine = "";
          }
        } else if (c != '\r') {  // if you got anything else but a carriage return character,
          currentLine += c;      // add it to the end of the currentLine
        }

        // Check to see if the client request was "GET /H" or "GET /L":
        if (currentLine.endsWith("GET /configuration")) {
          Serial.println("configuration");  // GET /H turns the LED on

          getConfiguration();

          client.println("HTTP/1.1 200 OK");
          client.println("Content-type:text/html");
          client.println();

          // the content of the HTTP response follows the header:
          client.print(cropConfiguration.temperature);

          // The HTTP response ends with another blank line:
          client.println();

          Serial.println(cropConfiguration.temperature);
        }
        if (currentLine.endsWith("GET /fan/ON")) {
          Serial.println("FAN ON");
          digitalWrite(FAN_PIN, ReleStatus::ON);
          matrix.loadFrame(happy);

          client.println("HTTP/1.1 200 OK");
          client.println("Content-type:text/html");
          client.println();
        }

        if (currentLine.endsWith("GET /fan/OFF")) {
          Serial.println("FAN OFF");
          digitalWrite(FAN_PIN, ReleStatus::OFF);
          matrix.loadFrame(heart);

          client.println("HTTP/1.1 200 OK");
          client.println("Content-type:text/html");
          client.println();
        }
      }
    }
    // close the connection:
    client.stop();
    Serial.println("client disconnected");
  }
}