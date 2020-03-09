import { Injectable } from '@angular/core';

import MemoryReminder from '@modules/reminder-management/src/providers/memory';
import { Reminder } from '@modules/reminder-management/src/reminder';

@Injectable()
export class ReminderService {
  private provider: MemoryReminder;

  public constructor() {
    this.provider = new MemoryReminder();
    this.provider.create({
      city: 'Test',
      color: { R: 100,G: 100, B: 100 },
      dateTime: new Date(),
      description: 'Testing'
    })
  }

  public getReminders(date: Date): Reminder[] {
    return this.provider.getByDescription('test');
  }
}
