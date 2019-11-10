import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DetailAndHolidayService } from "./detail&holiday.service";
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DetailResolver implements Resolve<any> {

    constructor(private dhService: DetailAndHolidayService) {

    }



    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const countryCode = route.params["countryCode"];
      return   this.dhService.getCountryByCode(countryCode).pipe(
            map(country => ({ country:country, hasError: false, error: null })),
            catchError(error => of({ countries: null, hasError: true, error: error }))
        );
    }
}