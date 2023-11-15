import { ICrop } from "../shared/types";

export function validateCrop(crop: ICrop): { ok: boolean, error?: string } {
    if (crop.setting.humidity < 0 || crop.setting.humidity > 100) {
        return { ok: false, error: 'Humidity must be between 0 and 100' };
    }

    if (crop.setting.temperature < 10 || crop.setting.temperature > 30) {
        return { ok: false, error: 'Temperature must be between 10 and 30' };
    }

    if (crop.setting.lightPercentage < 0 || crop.setting.lightPercentage > 100) {
        return { ok: false, error: 'Lighthours must be between 0 and 24' };
    }


    if (crop.setting.soilHumidity < 0 || crop.setting.soilHumidity > 100) {
        return { ok: false, error: 'Soil humidity must be between 0 and 100' };
    }

    return { ok: true };
}
