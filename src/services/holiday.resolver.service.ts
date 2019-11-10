import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DetailAndHolidayService } from './detail&holiday.service';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class HolidayResolver implements Resolve<any>{


constructor(private dhService: DetailAndHolidayService){}


    resolve(route: ActivatedRouteSnapshot , state: RouterStateSnapshot){
       const countryCode = route.params['countryCode']
        return this.dhService.getCountryHolidays(countryCode).pipe(
            map(response => {
                if(response.meta.code === 200 ){
                    return ({holidays: response.response.holidays , hasError: false, error : null , code: 200 })
                }else{
                    return ({holidays: null , hasError: true, error : response.meta.error_type , code: response.meta.code})
                }
            }),
            catchError(error => of({holidays: null , hasError: true, error : error.statusText , code: 500}))
        )

    }
}