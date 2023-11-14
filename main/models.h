

struct Crop {
  int temperature;
  int humidity;
  int soilHumidity;
  int lightPercentage;
};

struct Configuration {
  String ipAddress;               // Assuming IPv4 address, change size if needed
  Crop currentCropConfiguration;  // Assuming a maximum of 10 tomato crops, adjust as needed
  String currentCrop;             // Adjust size as needed
};

struct TempHum {
  float temp;
  float hum;
};


struct SensorsValue {
  TempHum tempHum;
  int luminosity;
  int soilMoisture;
};

Crop cropConfiguration;

WiFiSSLClient client;

SensorsValue sensorsValue;

ArduinoLEDMatrix matrix;


// sensors
// PIN TEMP AND HUM
#define DHTPIN 2
#define DHTTYPE DHT11

#define LUMINOSITYPIN A0

#define HYGROMETERPIN A1

#define HEATER_PIN 3
#define LIGHT_PIN 4
#define PUMP_PIN 5
#define FAN_PIN 6



#define MAX_VALUE_LUMINOSITY 1000
#define MIN_VALUE_LUMINOSITY 20

DHT dht(DHTPIN, DHTTYPE);

enum ReleStatus {
  ON = LOW,
  OFF = HIGH
};

const uint32_t happy[] = {
  0x19819,
  0x80000001,
  0x81f8000
};
const uint32_t heart[] = {
  0x3184a444,
  0x44042081,
  0x100a0040
};
