/**
 * The reminder structure definition.
 */

import { Color } from '@modules/color';

/**
 * Definition of the reminder information.
 */
export type Reminder = {
  /**
   * The reminder description. This is the text the user writes/edit/watch in the calendar.
   */
  readonly description: string;

  /**
   * The date and time to be reminded.
   */
  readonly dateTime: Date;

  /**
   * The city the reminder is related to.
   */
  readonly city: string;

  /**
   * The color assigned to the reminder. The format is RGB.
   */
  readonly color: Color;
}
