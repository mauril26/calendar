/**
 * Builder which builds a reminder given a user input.
 */

import { Color } from '@modules/color';
import { Reminder } from './reminder';

/**
 * Validates a given description is well formed.
 *
 * @param description The description to verify.
 *
 * @throws {Error} If the description is empty.
 * @throws {Error} If the description is longer than 30 characters.
 */
function validateDescription(description: string) {
  const maximumDescriptionLength = 30;

  if (!description) {
    throw new Error('Empty description is not supported.');
  }

  if (description.length > maximumDescriptionLength) {
    throw new Error(`Descriptions longer than ${maximumDescriptionLength} chars are not supported.`);
  }
}

/**
 * Validates a given color is well formed.
 *
 * @param color The color to verify.
 *
 * @throws {Error} If the R value if out of range.
 * @throws {Error} If the G value if out of range.
 * @throws {Error} If the B value if out of range.
 */
function validateColor(color: Color): void {
  if (color.R > 255) {
    throw new Error('R out of boundaries. The red value must be a value between 0 and 255.');
  }

  if (color.G > 255) {
    throw new Error('G out of boundaries. The green value must be a value between 0 and 255.');
  }

  if (color.B > 255) {
    throw new Error('B out of boundaries. The blue value must be a value between 0 and 255.');
  }
}

/**
 * Defines the reminder builder. Validates the values are congruent.
 */
export default class ReminderBuilder {
  private description = ''

  private dateTime = new Date();

  private city = '';

  private color = { R: 255, G: 255, B: 255 };

  /**
   * Sets the reminder description.
   *
   * @param description The reminder description.
   *
   * @returns The builder instance.
   */
  public setDescription(description: string): ReminderBuilder {
    this.description = description;

    return this;
  }

  /**
   * Sets the reminder date and time.
   *
   * @param dateTime The reminder date and time.
   *
   * @returns The builder instance.
   */
  public setDateTime(dateTime: Date): ReminderBuilder {
    this.dateTime = dateTime;

    return this;
  }

  /**
   * Sets the city the reminder is related to.
   *
   * @param city The city of the reminder.
   *
   * @returns The builder instance.
   */
  public setCity(city: string): ReminderBuilder {
    this.city = city;

    return this;
  }

  /**
   * Sets the color related to the reminder.
   *
   * @param color The reminder color.
   *
   * @returns The builder instance.
   */
  public setColor(color: Color): ReminderBuilder {
    this.color = color;

    return this;
  }

  /**
   * Builds a reminder.
   *
   * @returns The built reminder
   *
   * @throws {Error} If an id is empty.
   * @throws {Error} If an description is empty.
   * @throws {Error} If an description is longer than 30 chars.
   * @throws {Error} If an city name is empty.
   * @throws {Error} If a color has invalids values.
   */
  public build(): Reminder {
    this.validateArguments();

    return {
      description: this.description,
      dateTime: this.dateTime,
      city: this.city,
      color: this.color,
    };
  }

  /**
   * Validates the given arguments in the building process are valid.
   *
   * @throws {Error} If an id is empty.
   * @throws {Error} If an description is empty.
   * @throws {Error} If an description is longer than 30 chars.
   * @throws {Error} If an city name is empty.
   * @throws {Error} If a color has invalids values.
   */
  private validateArguments(): void {
    validateDescription(this.description);

    if (!this.city) {
      throw new Error('Empty city name is not supported.');
    }

    validateColor(this.color);
  }
}
