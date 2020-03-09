/**
 * Forecast provider implementation which gets the information from the 'Open Weather Map' API.
 */

import ForecastProvider from '../provider';
import { Forecast } from '../forecast';


type OpenMapForecast = {
  "weather": [{
    "main": string,
    "description": string
  }],
  "main": {
    "temp": number,
  }
}

async function localFetch(uri: string): Promise<any> {
  if (typeof fetch === 'undefined'){
    const request = new XMLHttpRequest();
    request.onloadend = (data) => {
      console.log(data);
      return data;
    };

    request.open('GET', uri);
    request.send();
  } else {
    return fetch(uri);
  }
}

/**
 * Implementation of forecast provider which gets the data from open weather map provider.
 */
export default class OpenWeatherMapForecast implements ForecastProvider
{
  private readonly apiId = '7835cd6083c3ec90d0a2162c49635cc0';
  private readonly uri = 'https://api.openweathermap.org/data/2.5/weather';

  /**
   * Gets the forecast given a city name.
   *
   * @param cityName The city to look the weather.
   *
   * @return The collection of daily forecasts; undefined if no city is found or not forecast is available;
   */
  public async get(cityName: string): Promise<Forecast[]> {
    let forecast = new Array<Forecast>();

    const uri = `${this.uri}?q=${encodeURI(cityName)}&mode=json&units=metric&appid=${this.apiId}`;
    const response = await localFetch(uri);
    const forecastResponse = (await response.json()) as OpenMapForecast;

    if (forecastResponse)
    {
      const { weather } = forecastResponse;
      const { main } = forecastResponse;

      forecast.push({
        city: cityName,
        date: new Date(),
        main: weather[0].main,
        description: weather[0].description,
        temperature: main.temp
      });
    }

    return forecast;
  }
}
