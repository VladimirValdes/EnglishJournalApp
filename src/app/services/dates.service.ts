import { Injectable } from '@angular/core';
import { endOfDay, startOfDay, subDays, startOfMonth, subMonths, endOfMonth } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DatesService {

  today = new Date();
  // constructor() { }


  getDay( day: Date ): { startAt: Date, endAt: Date } {

    return {
      startAt: startOfDay(day),
      endAt: endOfDay(day),
    };

  }

  subtractDays( day: Date, numberDays: number ): { startAt: Date, endAt: Date }  {
    return {
      startAt: subDays(day, numberDays),
      endAt: this.today,
    };
  }

  currentMonth( day: Date, numberDays: number ): { startAt: Date, endAt: Date } {
    return {
      startAt: startOfMonth(subMonths(this.today, numberDays)),
      endAt: endOfMonth(subMonths(this.today, numberDays)),
    };
  }
}
