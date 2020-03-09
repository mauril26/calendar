/**
 * Forecast provider implementation which gets the information from the 'Open Weather Map' API.
 */

import ForecastProvider from '../provider';
import { Forecast } from '../forecast';

function getPeriodForecast(startingDate: Date, period: number) {
  const result = new Array<Forecast>();

  for (let i = 0; i < period; i += 1) {
    result.push({
      city: 'Debug city',
      date: new Date(startingDate.getDate() + i),
      description: 'clear sky',
      main: 'Clear',
      temperature: 20
    })
  }

  return result;
}

/**
 * Implementation of forecast provider which gets the data from open weather map provider.
 */
export default class DebugForecast implements ForecastProvider {
  /**
   * Gets the forecast given a city name.
   *
   * @param cityName The city to look the weather.
   * @param startingDate The starting day of the forecast.
   * @param period The amount of days to get the forecast.
   *
   * @return The collection of daily forecasts; undefined if no city is found or not forecast is available;
   */
  public async get(cityName: string, startingDate?: Date, period?: number): Promise<Forecast[]> {
    let result = new Array<Forecast>();

    if (cityName != 'Debug city') {
      return result;
    }

    if (cityName && startingDate && period) {
      result = getPeriodForecast(startingDate, period);
    } else if (cityName) {
      result.push({
        city: cityName,
        date: startingDate || new Date(),
        description: 'clear sky',
        main: 'Clear',
        temperature: 20
      });
    }

    return result;
  }
}
