import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable ,of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class DetailAndHolidayService {


   api_key = "3745ccfba2712b367052db0014c1d5a37566cba1" ;
   holidayUrl = 'https://calendarific.com/api/v2/holidays' ;
    constructor(private route: ActivatedRoute , private _http : HttpClient){}


    getCountryByCode(countryCode: string):Observable<any>{
    

      if(sessionStorage.getItem("sessionSet") === "1"){

         return of(JSON.parse(sessionStorage.getItem(countryCode))) ;
         
      }else{
         return this._http.get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
      }

      
      
    }



    getCountryHolidays(countryCode: string ) : Observable<any>{
       const year = new Date().getFullYear() ;
           console.log(`${this.holidayUrl}?&api_key=${this.api_key}&country=${countryCode}&year=${year}`)
           return this._http.get(`${this.holidayUrl}?&api_key=${this.api_key}&country=${countryCode}&year=${year}`) ;
    }

}