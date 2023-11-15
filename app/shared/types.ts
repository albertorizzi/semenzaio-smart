export type TempHum = {
    temp: number;
    hum: number;
}

export type Crop = {
    soilHumidity: number;
    tempHum: TempHum;
    luminosity: number;
    soilMoisture: number;
}

export type Configuration = {
    crops: Crop[];
    currentCrop: Crop;
    ipAddress: string;
}

export type Log = {
    tempHum: TempHum;
    timestamp: number;
}

export interface ICrop {
    name: string;
    setting: {
        humidity: number;
        temperature: number;
        soilHumidity: number;
        lightPercentage: number;
    };
}

export type ICropSettingsKey = "humidity" | "temperature" | "soilHumidity" | "lightPercentage";