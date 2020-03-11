# Calendar

This is a sample calendar to cover some requirements given as job screening.

The calendar allow the user to:
1. Switch between months showing a grid of 42 cells (grouped in 7 columns).
2. Show the cells with specific classes (styles) according the "kind" of day, ie, passed days, weekends.

The sample covers the following structures/classes:
1. `Reminder`; which allows the user to build a reminder (composed by city, date, description among other attributes)
2. `ReminderBuilder`; Used to build reminders given some values. Ensures the validity of the given values. (According the requirements)
4. `ReminderProvider`; Reminder provider interface.
5. `MemoryReminder` which `implements ReminderProvider`; an in-memory storage for reminders. Allows the user to store, edit, search and remove reminders.
6. `Forecast` Definition of a structure with the forecast information of a day.
7. `ForecastProvider`; Weather provider interface.
8. `OpenWeatherMapForecast` whichs `implements ForecastProvider`, a weather provider that consumes the *Open Weather Map API*

The unit tests covers:
1. Reminders builder.
2. Memory reminder provider
3. Debug forecast provides
