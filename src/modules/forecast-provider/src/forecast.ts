/**
 * The forecast structure definition.
 */

/**
 * Definition of the forecast information.
 */
export type Forecast = {
  /**
   * The main informative message about the weather in a given moment.
   */
  readonly main: string;

  /**
   * The description of the weather in a given moment.
   */
  readonly description: string;

  /**
   * The temperature in a given moment.
   */
  readonly temperature: number;

  /**
   * The date of the forecast.
   */
  readonly date: Date;

  /**
   * The city related to the forecast.
   */
  readonly city: string;
}
