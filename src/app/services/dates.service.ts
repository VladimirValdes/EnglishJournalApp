import { Injectable } from '@angular/core';
import { endOfDay, startOfDay, subDays, startOfMonth, subMonths, endOfMonth, formatISO } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DatesService {

  today = new Date();
  // constructor() { }


  getDay( day: Date ): { startAt: string, endAt: string } {

    return {
      startAt: formatISO(startOfDay(day)),
      endAt: formatISO(endOfDay(day)),
    };

  }

  subtractDays( day: Date, numberDays: number ): { startAt: Date, endAt: Date }  {
    return {
      startAt: subDays(day, numberDays),
      endAt: this.today,
    };
  }

  currentMonth( numberDays: number ): { startAt: string, endAt: string } {
    return {
      startAt: formatISO( startOfMonth(subMonths(this.today, numberDays))),
      endAt: formatISO( endOfMonth(subMonths(this.today, numberDays))),
    };
  }
}
