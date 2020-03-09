import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReminderService } from '../../services/reminder.service';

import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [ReminderService]
})
export class CalendarComponent implements OnInit {
  public reminderService: ReminderService;
  public days: number[];
  public year: string;
  public month: string;

  public currentDateCalendarUri: string;
  public previousCalendarUri: string;
  public nextCalendarUri: string;

  public firstDayOfMonthOffset = 0;

  private route: ActivatedRoute
  private lastDayOfMonth = 0;

  public constructor(route: ActivatedRoute, reminderService: ReminderService) {
    this.reminderService = reminderService;
    this.route = route;
    this.currentDateCalendarUri = `calendar/${moment(new Date()).format('YYYY/MM')}`;
  }

  ngOnInit(): void {
    if (this.route) {
      this.route.params.subscribe(params =>
        this.updateCalendar(params.year, params.month));
    }
  }

  public isWeekend(dateToTest: string): boolean {
    const day = moment(dateToTest).day() + 1;
    return day%7===0 || (day-1)%7===0;
  }

  public isMonthDay(i: number) {
    return i >= this.firstDayOfMonthOffset &&
      i <= (this.firstDayOfMonthOffset + this.lastDayOfMonth - 1)
  }

  public isAvailableDay(i: number) {
    const dateToTest = `${this.year}/${this.month}/${i - this.firstDayOfMonthOffset + 1}`;

    return this.isMonthDay(i) &&
      !this.isWeekend(dateToTest) &&
      moment(dateToTest).isAfter(moment().subtract(1, 'day'));
  }

  public addReminder() {

  }

  public editReminder(id: string) {

  }

  private updateCalendar(year, month) {
    const currentMoment = [year, month-1, 1];
    this.year = year;
    this.month = month;

    let currentDate = moment(currentMoment);
    this.firstDayOfMonthOffset = currentDate.day();
    this.days = new Array(42);
    this.lastDayOfMonth =   currentDate.daysInMonth()

    currentDate = moment(currentMoment);
    const prevDate = currentDate.subtract(1, 'month').format('YYYY/MM');
    currentDate = moment(currentMoment);
    const nextDate = currentDate.add(1, 'month').format('YYYY/MM');

    this.previousCalendarUri = `calendar/${prevDate}`;
    this.nextCalendarUri = `calendar/${nextDate}`;

    console.log(this.reminderService.getReminders(new Date));
  }
}
