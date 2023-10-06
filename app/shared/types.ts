export type LightHours = {
    fiorituraPhase: number;
    vegetativaPhase: number;
}

export type TempHum = {
    temp: number;
    hum: number;
}

export type Crop = {
    soilHumidity: number;
    tempHum: TempHum;
    lightHours: LightHours;
}

export type Configuration = {
    crops: Crop[];
    currentCrop: Crop;
    ipAddress: string;
}

export interface ICrop {
    name: string;
    setting: {
        humidity: number;
        temperature: number;
        soilHumidity: number;
        lightHours: LightHours;
    };
}

export type ICropSettingsKey = "humidity" | "temperature" | "soilHumidity" | "lightHours" | "fiorituraPhase" | "vegetativaPhase";