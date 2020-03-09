import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ReminderComponent } from './components/reminder/reminder.component';

const startingRoute = `calendar/${new Date().getFullYear()}/${new Date().getMonth()+1}`;

const routes: Routes = [
  {'path': 'calendar/:year/:month', 'component': CalendarComponent},
  {'path': 'new/:year/:month/:day', 'component': ReminderComponent},
  {'path': 'event/:event-id', 'component': ReminderComponent},
  {'path': '**', redirectTo: startingRoute}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
