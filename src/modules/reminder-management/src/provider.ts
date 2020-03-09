/**
 * Definition of the CRUD interface to provide the reminders management.
 */

import { Reminder } from './reminder';
import { Color } from '../../color';

/**
 * Defines the interface to handle the reminders.
 */
export default interface ReminderProvider {
  /**
   * Gets a reminder looking by identifier.
   * 
   * @param id The identifier to look for
   * 
   * @returns The found reminder; if no id matches, undefined is returned.
   */
  getById(id: string): Reminder | undefined;

  /**
   * Gets the reminders which matches the given description.
   * 
   * @param description The description to look for.
   * 
   * @returns The collection of reminders which match the given description.
   */
  getByDescription(description: string): Reminder[];

  /**
   * Gets the reminders which matches the given dates.
   * 
   * @param startingDate 
   * @param endingDate
   * 
   * @returns The collection of reminders after the given starting date, and before the ending date if given.
   */
  getByDate(startingDate: Date, endingDate?: Date): Reminder[];
  
  /**
   * Gets the reminders which matches the given city name.
   * 
   * @param cityName The city to look for.
   * 
   * @returns The collection of reminders which match the given city name.
   */
  getByCityName(cityName: string): Reminder[];

  /**
   * Gets the reminders which matches the given color.
   * 
   * @param color The color of the reminder to look for.
   * 
   * @returns The collection of reminders which match the given color.
   */
  getByColor(color: Color): Reminder[];

  /**
   * Inserts a reminder into the provider.
   * 
   * @param reminder The reminder to add to the provider.
   * 
   * @returns The id of the inserted reminder.
   */
  create(reminder: Reminder): string;

  /**
   * Updates a reminder.
   * 
   * @param id The identifier of the reminder to update.
   * @param reminder The new reminder values.
   * 
   * @returns True if the reminder could be updated; otherwise, false.
   */
  update(id: string, reminder: Reminder): boolean;
  
  /**
   * Removes a reminder from the provider.
   * 
   * @param id The reminder identifier.
   * 
   * @return True if the reminder could be removed; otherwise, false
   */
  delete(id: string): boolean;
}
