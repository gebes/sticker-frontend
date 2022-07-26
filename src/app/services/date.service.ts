import {Injectable} from "@angular/core";

@Injectable()
export class DateService {

  public formatDate(date: string): string {
    return new Date(date).toLocaleDateString('de-de', {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC"
    })
  }

  public formatTime(date: string, addZero: boolean = true): string {
    let d = new Date(date)
    let hour = parseInt(d.toTimeString().split(":")[0])
    return ((hour < 10) ? "0" : "") + hour.toFixed(0) + (addZero ? ":00" : "")
  }

  public sameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
  }

}
