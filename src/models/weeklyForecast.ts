export default class WeeklyForecast {
  detailedForecast: String;
  icon: String;
  name: String;
  temperature: number;
  windDirection: String;
  windSpeed: String;
  chanceOfRain: String;

  constructor(
    detailedForecast: String,
    icon: String,
    name: String,
    temperature: number,
    windDirection: String,
    windSpeed: String,
    chanceOfRain: String,
  ) {
    this.detailedForecast = detailedForecast;
    this.icon = icon;
    this.name = name;
    this.temperature = temperature;
    this.windDirection = windDirection;
    this.windSpeed = windSpeed;
    this.chanceOfRain = chanceOfRain;
  }
}
