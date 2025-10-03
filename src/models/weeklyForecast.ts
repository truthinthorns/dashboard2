export default class WeeklyForecast {
  detailedForecast: string;
  dewpoint: {
    unitCode: string;
    value: number;
  };
  endTime: Date;
  icon: string;
  isDaytime: boolean;
  name: string;
  probabilityOfPrecipitation: {
    unitCode: string;
    value: number;
  };
  relativeHumidity: {
    unitCode: string;
    value: number;
  };
  shortForecast: string;
  startTime: Date;
  temperature: number;
  temperatureTrend: string;
  temperatureUnit: string;
  windDirection: string;
  windSpeed: string;

  constructor(
    detailedForecast: string,
    dewpoint: {
      unitCode: string;
      value: number;
    },
    endTime: Date,
    icon: string,
    isDaytime: boolean,
    name: string,
    probabilityOfPrecipitation: {
      unitCode: string;
      value: number;
    },
    relativeHumidity: {
      unitCode: string;
      value: number;
    },
    shortForecast: string,
    startTime: Date,
    temperature: number,
    temperatureTrend: string,
    temperatureUnit: string,
    windDirection: string,
    windSpeed: string
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
