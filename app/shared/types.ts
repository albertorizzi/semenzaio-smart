export type LightHours = {
    fiorituraPhase: number;
    vegetativePhase: number;
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