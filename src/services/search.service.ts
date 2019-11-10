
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, from, observable, Subscriber } from 'rxjs';
import { catchError, } from "rxjs/operators"
import { SearchModel } from 'src/app/model/search.model';

@Injectable()
export class SearchSevice {
locationByIpApi = "http://api.ipapi.com/api/check?access_key=903f49d0f6543a49cc8f6202130f1ac2" ;
  constructor(private http: HttpClient) {

  }

  getCountries(): Observable<any> {
    if (sessionStorage.getItem("sessionSet") === "1") {
      const countries = [];
      const keys = Object.keys(sessionStorage);
      keys.forEach(key => {
        if (sessionStorage.hasOwnProperty(key) && key !== "sessionSet") {
          countries.push(JSON.parse(sessionStorage.getItem(key)));
        }
        
      })
      return of(countries);
    } else {
      const countriesObservable = this.http.get("https://restcountries.eu/rest/v2/all");
      countriesObservable.subscribe(countries => this.storeCountries(countries));
      return countriesObservable;
    }



  }

  private storeCountries(countries: any) {

    countries.forEach(country => {
      sessionStorage.setItem(country.alpha2Code , JSON.stringify(country)) ;
    });
    sessionStorage.setItem("sessionSet" , "1") ;
  }


  getCurrentLocationByIP() : Observable<any>{
  return this.http.get(this.locationByIpApi) ;
  }
}
