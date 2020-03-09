/**
 * Reminder provider implementation which stores the reminders in memory.
 */

import { v4 as uuidv4 } from 'uuid';

import ReminderProvider from '../provider';
import { Reminder } from '../reminder';
import { Color } from '../../../color';

/**
 * Reminder provider which stores in memory.
 */
export default class MemoryReminder implements ReminderProvider {
  private repository = new Map<string, Reminder>();

  /**
   * Gets a reminder looking by identifier.
   *
   * @param id The identifier to look for
   *
   * @returns The found reminder; if no id matches, undefined is returned.
   */
  getById(id: string): Reminder | undefined{
    return this.repository.get(id);
  }

  /**
   * Gets the reminders which matches the given description.
   *
   * @param description The description to look for.
   *
   * @returns The collection of reminders which match the given description.
   */
  getByDescription(description: string): Reminder[] {
    return Array.from(this.repository.values())
      .filter((item) => item.description.toLowerCase().includes(description.toLowerCase()));
  }

  /**
   * Gets the reminders which matches the given dates.
   *
   * @param startingDate
   * @param endingDate
   *
   * @returns The collection of reminders after the given starting date, and before the ending date if given.
   */
  getByDate(startingDate: Date, endingDate?: Date): Reminder[] {
    let filtered = Array.from(this.repository.values())
      .filter((item) => item.dateTime > startingDate);

    if (endingDate && filtered.length > 0) {
      filtered = filtered.filter((item) => item.dateTime < endingDate);
    }

    return filtered;
  }

  /**
   * Gets the reminders which matches the given city name.
   *
   * @param cityName The city to look for.
   *
   * @returns The collection of reminders which match the given city name.
   */
  getByCityName(cityName: string): Reminder[] {
    return Array.from(this.repository.values())
      .filter((item) => item.city.includes(cityName));
  }

  /**
   * Gets the reminders which matches the given color.
   *
   * @param color The color of the reminder to look for.
   *
   * @returns The collection of reminders which match the given color.
   */
  getByColor(color: Color): Reminder[] {
    return Array.from(this.repository.values())
      .filter((item) => {
        return item.color.R === color.R &&
          item.color.G === color.G &&
          item.color.B === color.B
      });
  }

  /**
   * Inserts a reminder into the provider.
   *
   * @param reminder The reminder to add to the provider.
   *
   * @returns The id of the inserted reminder.
   *
   * @throws {Error} If the given reminder identifier exists.
   */
  create(reminder: Reminder): string {
    const id = uuidv4();

    if (!this.repository.has(id)) {
      this.repository.set(id, reminder);
      return id;
    }

    throw new Error('A reminder with the given id was already stored')
  }

  /**
   * Updates a reminder.
   *
   * @param reminder The reminder to update.
   * @param id The reminder identifer to update.
   *
   * @returns True if the reminder could be updated; otherwise, false.
   */
  update(id: string, reminder: Reminder): boolean {
    if (this.repository.has(id)) {
      this.repository.set(id, reminder);
      return true;
    }

    return false;
  }

  /**
   * Removes a reminder from the provider, given an identifier.
   *
   * @param id The identifier of the reminder to remove.
   *
   * @return True if the reminder could be removed; otherwise, false
   */
  delete(id: string): boolean {
    return this.repository.delete(id);
  }
}
