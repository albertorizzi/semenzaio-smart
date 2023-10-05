export type LightHours = {
    fiorituraPhase: number;
    vegetativePhase: number;
}

export type Crop = {
    humidity: number;
    soilHumidity: number;
    temperature: number;
    lightHours: LightHours;
}

export type Configuration = {
    crops: Crop[];
    currentCrop: Crop;
    ipAddress: string;
}