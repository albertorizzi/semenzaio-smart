

DynamicJsonDocument sendRequest(String method, String path, String payload) {
  DynamicJsonDocument jsonResponse(2048);

  if (!client.connect(FIREBASE_HOST, 443)) {
    Serial.println(method + " failed to connect");
    return jsonResponse;
  }

  path = path + ".json";
  String request = method + " " + path + " HTTP/1.1\r\n" + "Host: " + FIREBASE_HOST + "\r\n" + "Content-Type: application/json\r\n" + "Content-Length: " + String(payload.length()) + "\r\n" + "Connection: close\r\n\r\n" + payload;
  client.print(request);
  Serial.println(method + " request sent");

  // Check HTTP status
  char status[32] = { 0 };
  client.readBytesUntil('\r', status, sizeof(status));
  if (strcmp(status, "HTTP/1.1 200 OK") != 0) {
    Serial.print(F("Unexpected response: "));
    Serial.println(status);
    client.stop();
    return jsonResponse;
  }

  // Skip HTTP headers
  char endOfHeaders[] = "\r\n\r\n";
  if (!client.find(endOfHeaders)) {
    Serial.println(F("Invalid response"));
    client.stop();
    return jsonResponse;
  }

  // Allocate the JSON document
  // Use arduinojson.org/v6/assistant to compute the capacity.
  const size_t capacity = JSON_OBJECT_SIZE(3) + JSON_ARRAY_SIZE(2) + 60;
  DynamicJsonDocument doc(2048);

  // Parse JSON object
  DeserializationError error = deserializeJson(doc, client);
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.c_str());
  } else {
    // Successfully parsed JSON, return the parsed data
    jsonResponse = doc;
  }

  // Disconnect
  client.stop();

  return jsonResponse;
}

void getConfiguration() {
  DynamicJsonDocument r = sendRequest("GET", "/configuration", "");

  String currentCrop = r["currentCrop"].as<String>();

  cropConfiguration.humidity = r["crops"][currentCrop]["humidity"].as<int>();
  cropConfiguration.soilHumidity = r["crops"][currentCrop]["soilHumidity"].as<int>();
  cropConfiguration.temperature = r["crops"][currentCrop]["temperature"].as<int>();
  cropConfiguration.lightHours.fiorituraPhase = r["crops"][currentCrop]["lightHours"]["fiorituraPhase"].as<int>();
  cropConfiguration.lightHours.vegetativaPhase = r["crops"][currentCrop]["lightHours"]["vegetativaPhase"].as<int>();
}

void sendLogSensors() {
  // Serialize the sensorsValue struct to JSON.
  DynamicJsonDocument jsonDoc(1024);
  JsonObject payload = jsonDoc.to<JsonObject>();
  payload["tempHum"]["temp"] = sensorsValue.tempHum.temp;
  payload["tempHum"]["hum"] = sensorsValue.tempHum.hum;

  // Serialize the JSON object to a string
  String jsonString;
  serializeJson(jsonDoc, jsonString);

  DynamicJsonDocument r = sendRequest("POST", "/logs", jsonString);
  serializeJson(r, Serial);
}
