'use strict'

const stationAnalytics = {

    latestReading(station) {
        station.latestReading = JSON.parse(JSON.stringify(station.readings[station.readings.length - 1]));
    },

    computeStationAnalytics(station) {
        this.latestReading(station);
        this.translateWeatherCode(station.latestReading);
        this.celsiusToFahrenheit(station.latestReading);
        this.beaufortConversion(station.latestReading);
        this.windChill(station.latestReading);
        this.windDirectionCompass(station.latestReading);
        this.tempTrendGraph(station);
        this.windTrendGraph(station);
        this.pressureTrendGraph(station);
        this.trendInTemp(station);
        this.setMaxTemp(station);
        this.setMinTemp(station);
        this.trendInWindSpeed(station);
        this.setMaxWind(station);
        this.setMinWind(station);
        this.trendInPressure(station);
        this.setMaxPressure(station);
        this.setMinPressure(station);
    },

    translateWeatherCode(latestReading) {
        const code = latestReading.code;

        switch (true) {
            case [800].includes(code):
                latestReading.translatedWeatherCode = "Clear";
                latestReading.weatherIcon = "sun";
                break;
            case [801].includes(code):
                latestReading.translatedWeatherCode = "Partial Clouds";
                latestReading.weatherIcon = "cloud sun";
                break;
            case [701, 711, 721, 731, 741, 751, 761, 762, 771, 781].includes(code):
                latestReading.translatedWeatherCode = "Haze";
                latestReading.weatherIcon = "eye slash outline";
                break;
            case [802, 803, 804].includes(code):
                latestReading.translatedWeatherCode = "Cloudy";
                latestReading.weatherIcon = "cloud";
                break;
            case [300, 310].includes(code):
                latestReading.translatedWeatherCode = "Light Showers";
                latestReading.weatherIcon = "shower";
                break;
            case [302, 311, 312, 313, 314, 321].includes(code):
                latestReading.translatedWeatherCode = "Heavy Showers";
                latestReading.weatherIcon = "shower";
                break;
            case [500, 501, 502, 503, 504, 511, 520, 521, 522, 531].includes(code):
                latestReading.translatedWeatherCode = "Rain";
                latestReading.weatherIcon = "tint";
                break;
            case [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622].includes(code):
                latestReading.translatedWeatherCode = "Snow";
                latestReading.weatherIcon = "snowflake";
                break;
            case [200, 201, 202, 210, 211, 212, 221, 230, 231, 232].includes(code):
                latestReading.translatedWeatherCode = "Thunder";
                latestReading.weatherIcon = "bolt";
                break;
            default:
        }
    },


    tempTrendGraph(station) {
        station.tempTrendData = [];
        station.trendLabels = [];

        for (let i = 0; i < station.readings.length; i++) {
            station.tempTrendData.push(station.readings[i].temperature);
            station.trendLabels.push(station.readings[i].date);
        }
    },

    windTrendGraph(station) {
        station.windTrendData = [];

        for (let i = 0; i < station.readings.length; i++) {
            station.windTrendData.push(station.readings[i].windSpeed);

        }
    },

    pressureTrendGraph(station) {
        station.pressureTrendData = [];


        for (let i = 0; i < station.readings.length; i++) {
            station.pressureTrendData.push(station.readings[i].pressure);

        }
    },

    celsiusToFahrenheit(latestReading) {
        latestReading.temperatureInFahrenheit = (32 + (9 / 5) * (latestReading.temperature));
    },

    addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    },

    windChill(latestReading) {
        const partA = 13.12 + 0.6215 * (latestReading.temperature);
        const partB = (-11.37 + 0.3965 * latestReading.temperature) * (Math.pow(latestReading.windSpeed, 0.16));
        const total = partA + partB;

        latestReading.windChill = total.toPrecision(3);
    },

    windDirectionCompass(latestReading) {
        const compass = [];
        compass.push("North");
        compass.push("North North-East");
        compass.push("North-East");
        compass.push("East North-East");
        compass.push("East");
        compass.push("East South-East");
        compass.push("South-East");
        compass.push("South South-East");
        compass.push("South");
        compass.push("South South-West");
        compass.push("South-West");
        compass.push("West South-West");
        compass.push("West");
        compass.push("West North-West");
        compass.push("North-West");
        compass.push("North North-West");
        let initialRange = 33.75;
        let count = 1;
        for (let i = 11.25; i < 348.75; i += 22.5) {

            if (latestReading.windDirection >= i && latestReading.windDirection <= initialRange) {
                latestReading.windDirectionCompass = compass[count];

            } else if ((latestReading.windDirection >= 0 && latestReading.windDirection <= 11.25) ||
                (latestReading.windDirection >= 348.75 && latestReading.windDirection <= 360)) {
                latestReading.windDirectionCompass = compass[0];
            } else {
                count++;
                initialRange += 22.5;
            }
        }
    },

    isBetween(input, lower, upper) {
        let output = false;
        if (lower <= input && input <= upper) {
            output = true;
        }
        ;
        return output;
    },


    beaufortConversion(latestReading) {
        if (latestReading.windSpeed >= 0 && latestReading.windSpeed < 1) {
            latestReading.windBeaufort = 0;
        } else if (this.isBetween(latestReading.windSpeed, 1, 5)) {
            latestReading.windBeaufort = 1;
        } else if (this.isBetween(latestReading.windSpeed, 6, 11)) {
            latestReading.windBeaufort = 2;
        } else if (this.isBetween(latestReading.windSpeed, 12, 19)) {
            latestReading.windBeaufort = 3;
        } else if (this.isBetween(latestReading.windSpeed, 20, 28)) {
            latestReading.windBeaufort = 4;
        } else if (this.isBetween(latestReading.windSpeed, 29, 38)) {
            latestReading.windBeaufort = 5;
        } else if (this.isBetween(latestReading.windSpeed, 39, 49)) {
            latestReading.windBeaufort = 6;
        } else if (this.isBetween(latestReading.windSpeed, 50, 61)) {
            latestReading.windBeaufort = 7;
        } else if (this.isBetween(latestReading.windSpeed, 62, 74)) {
            latestReading.windBeaufort = 8;
        } else if (this.isBetween(latestReading.windSpeed, 75, 88)) {
            latestReading.windBeaufort = 9;
        } else if (this.isBetween(latestReading.windSpeed, 89, 102)) {
            latestReading.windBeaufort = 10;
        } else if (this.isBetween(latestReading.windSpeed, 103, 117)) {
            latestReading.windBeaufort = 11;
        }
    },


    trendInTemp(station) {
        if (station.readings.length >= 3) {
            const lastReading = station.readings[station.readings.length - 1].temperature;
            const secondLastReading = station.readings[station.readings.length - 2].temperature;
            const thirdLastReading = station.readings[station.readings.length - 3].temperature;
            const differenceOne = lastReading - secondLastReading;
            const differenceTwo = secondLastReading - thirdLastReading;
            station.fallingTrendTemp = false;
            station.risingTrendTemp = false;
            station.steadyTrendTemp = false;
            if (differenceOne < 0 && differenceTwo < 0) {
                station.fallingTrendTemp = true;
            } else if (differenceOne > 0 && differenceTwo > 0) {
                station.risingTrendTemp = true;
            } else {
                station.steadyTrendTemp = true;
            }


        } else {
            station.fallingTrendTemp = false;
            station.risingTrendTemp = false;
            station.steadyTrendTemp = false;
        }
    },

    setMaxTemp(station) {
        station.maxTemp = null;
        if (station.readings.length > 0) {
            station.maxTemp = station.readings[0].temperature;
            for (let i = 1; i < station.readings.length; i++) {
                if (station.readings[i].temperature > station.maxTemp) {
                    station.maxTemp = station.readings[i].temperature;
                }
            }
        }
    },

    setMinTemp(station) {
        station.minTemp = null;
        if (station.readings.length > 0) {
            station.minTemp = station.readings[0].temperature;
            for (let i = 1; i < station.readings.length; i++) {
                if (station.readings[i].temperature < station.minTemp) {
                    station.minTemp = station.readings[i].temperature;
                }
            }
        }
    },

    trendInPressure(station) {
        if (station.readings.length >= 3) {
            const lastReading = station.readings[station.readings.length - 1].pressure;
            const secondLastReading = station.readings[station.readings.length - 2].pressure;
            const thirdLastReading = station.readings[station.readings.length - 3].pressure;
            const differenceOne = lastReading - secondLastReading;
            const differenceTwo = secondLastReading - thirdLastReading;
            station.fallingTrendPressure = false;
            station.risingTrendPressure = false;
            station.steadyTrendPressure = false;
            if (differenceOne < 0 && differenceTwo < 0) {
                station.fallingTrendPressure = true;
            } else if (differenceOne > 0 && differenceTwo > 0) {
                station.risingTrendPressure = true;
            } else {
                station.steadyTrendPressure = true;
            }


        } else {
            station.fallingTrendPressure = false;
            station.risingTrendPressure = false;
            station.steadyTrendPressure = false;
        }
    },

    setMaxPressure(station) {
        station.maxPressure = null;
        if (station.readings.length > 0) {
            station.maxPressure = station.readings[0].pressure;
            for (let i = 1; i < station.readings.length; i++) {
                if (station.readings[i].pressure > station.maxPressure) {
                    station.maxPressure = station.readings[i].pressure;
                }
            }
        }
    },

    setMinPressure(station) {
        station.minPressure = null;
        if (station.readings.length > 0) {
            station.minPressure = station.readings[0].pressure;
            for (let i = 1; i < station.readings.length; i++) {
                if (station.readings[i].pressure < station.minPressure) {
                    station.minPressure = station.readings[i].pressure;
                }
            }
        }
    },

    trendInWindSpeed(station) {
        if (station.readings.length >= 3) {
            const lastReading = station.readings[station.readings.length - 1].windSpeed;
            const secondLastReading = station.readings[station.readings.length - 2].windSpeed;
            const thirdLastReading = station.readings[station.readings.length - 3].windSpeed;
            const differenceOne = lastReading - secondLastReading;
            const differenceTwo = secondLastReading - thirdLastReading;
            station.fallingTrendWind = false;
            station.risingTrendWind = false;
            station.steadyTrendWind = false;
            if (differenceOne < 0 && differenceTwo < 0) {
                station.fallingTrendWind = true;
            } else if (differenceOne > 0 && differenceTwo > 0) {
                station.risingTrendWind = true;
            } else {
                station.steadyTrendWind = true;
            }


        } else {
            station.fallingTrendWind = false;
            station.risingTrendWind = false;
            station.steadyTrendWind = false;
        }
    },

    setMaxWind(station) {
        station.maxWind = null;
        if (station.readings.length > 0) {
            station.maxWind = station.readings[0].windSpeed;
            for (let i = 1; i < station.readings.length; i++) {
                if (station.readings[i].windSpeed > station.maxWind) {
                    station.maxWind = station.readings[i].windSpeed;
                }
            }
        }
    },

    setMinWind(station) {
        station.minWind = null;
        if (station.readings.length > 0) {
            station.minWind = station.readings[0].windSpeed;
            for (let i = 1; i < station.readings.length; i++) {
                if (station.readings[i].windSpeed < station.minWind) {
                    station.minWind = station.readings[i].windSpeed;
                }
            }
        }
    },

    sortStationsAlphabetically(stations) {
        stations.sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));
    }


}

module.exports = stationAnalytics;