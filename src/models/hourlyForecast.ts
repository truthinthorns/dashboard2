export default class WeeklyForecast {
  number: number;
  name: String;
  startTime: String;
  endTime: String;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: String;
  temperatureTrend: String;
  probabilityOfPrecipitation: {
    unitCode: String;
    value: number;
  };
  dewpoint: {
    unitCode: String;
    value: number;
  };
  relativeHumidity: {
    unitCode: String;
    value: number;
  };
  windSpeed: String;
  windDirection: String;
  icon: String;
  shortForecast: String;
  detailedForecast: String;

  constructor(
    number: number,
    detailedForecast: String,
    dewpoint: {
      unitCode: String;
      value: number;
    },
    endTime: Date,
    icon: String,
    isDaytime: boolean,
    name: String,
    probabilityOfPrecipitation: {
      unitCode: String;
      value: number;
    },
    relativeHumidity: {
      unitCode: String;
      value: number;
    },
    shortForecast: String,
    startTime: Date,
    temperature: number,
    temperatureTrend: String,
    temperatureUnit: String,
    windDirection: String,
    windSpeed: String
  ) {
    this.detailedForecast = detailedForecast;
    this.dewpoint = dewpoint;
    this.endTime = endTime;
    this.icon = icon;
    this.isDaytime = isDaytime;
    this.name = name;
    this.probabilityOfPrecipitation = probabilityOfPrecipitation;
    this.relativeHumidity = relativeHumidity;
    this.shortForecast = shortForecast;
    this.startTime = startTime;
    this.temperature = temperature;
    this.temperatureTrend = temperatureTrend;
    this.temperatureUnit = temperatureUnit;
    this.windDirection = windDirection;
    this.windSpeed = windSpeed;
  }
}
