import { Component } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { isUndefined } from 'util';


@Component({
  selector: "country-detail",
  templateUrl: "detail.component.html",
  styleUrls: ["detail.component.css"]

})
export class DetailComponent {

  holidays: any;
  country: any;
  hasError: boolean = false;
  error: string = "";
  nextHoliday: any;
  nextHolidayIn: number = 0;
  holidays2D;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(result => {
      if (!result.detailResponseData.hasError) {
        this.country = result.detailResponseData.country;
      } else {
        this.hasError = this.hasError || true;
        this.error = `${this.error}, error loading country`;
      }


      if (!result.holidayResponseData.hasError && result.holidayResponseData.code === 200) {
        const hols = result.holidayResponseData.holidays
        
        this.computeDaysToHoliday(hols) ;
        this.holidays2D = this.reshape(hols) ;
      } else {
        this.holidays = null;
        this.hasError = this.hasError || true;
        this.error = `${this.error},   error loading holidays`;
      }

    })
  }

  private reshape(holidays: Array<any>) {
    const holidays2D = [];
    const rowNum = Math.ceil(holidays.length / 4);
    const colNum = 4;
    for (let x = 0; x < rowNum; x++) {
      const holidayArraySlice = holidays.slice((x * colNum), ((x + 1) * colNum));
      holidays2D[x] = holidayArraySlice;


    }
return holidays2D;
  }

  private computeDaysToHoliday(holidays: Array<any>): void {
    holidays.forEach(holiday => {
      const holidayDate = new Date(holiday.date.datetime.year,
        holiday.date.datetime.month - 1,
        holiday.date.datetime.day).getTime();

      const today = new Date().getTime();

      const diff = (-(today - holidayDate)) / (1000 * 60 * 60 * 24);
      if (diff < 0) {
        holiday.passed = true
      } else {
        holiday.passed = false;
        this.computeNextHoliday(diff,holiday) ;
      }
      Math.abs(diff) < 0.5 ?
        holiday.daysTo = `${diff * 24}hrs` : holiday.daysTo = `${Math.round(diff)}days`;

    })
  }
  private computeNextHoliday(diff: number, holiday: any): void {
    if (this.nextHolidayIn === 0) {
      this.nextHolidayIn = diff;
      this.nextHoliday = holiday;
    } else if (diff < this.nextHolidayIn) {
      this.nextHolidayIn = diff;
      this.nextHoliday = holiday;
    }
  }

  getHolidayDate(year:number,month:number,day:number){
    if(year && month && day){
       return new Date(year,month - 1,day) ;
    }
   

  }
}