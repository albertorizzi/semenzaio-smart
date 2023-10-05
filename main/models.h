
struct LightHours {
  int vegetativaPhase;
  int fiorituraPhase;
};

struct Crop {
  int temperature;
  int humidity;
  int soilHumidity;
  LightHours lightHours;
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
};

Crop cropConfiguration;

WiFiSSLClient client;

SensorsValue sensorsValue;


// sensors
// PIN TEMP AND HUM
#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
