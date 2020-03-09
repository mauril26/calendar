/**
 * Definition of the forecast interface to provide climate information.
 */

import { Forecast } from './forecast';

/**
 * Defines the interface to handle the forecast.
 */
export default interface ForecastProvider {
  /**
   * Gets the forecast given a city name.
   *
   * @param cityName The city to look the weather.
   */
  get(cityName: string, startingDate?: Date, period?: number): Promise<Forecast[]>;
}
