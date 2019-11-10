import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { SearchSevice } from './search.service';
import { map, catchError } from "rxjs/operators";
import {  of } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class LocationResolver implements Resolve<any> {


    constructor(private searchService: SearchSevice) { }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.searchService.getCurrentLocationByIP().pipe(
            map(result => ({ result, hasError: false, error: null })),
            catchError(error => of({ result: null, hasError: true, error }))
        )
    }
}


