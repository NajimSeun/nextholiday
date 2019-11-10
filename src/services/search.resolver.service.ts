import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot , Resolve, RouterStateSnapshot } from "@angular/router";
import { SearchSevice } from './search.service';
import { map, catchError, count } from "rxjs/operators";
import { of, Observable } from 'rxjs';
import { SearchModel } from 'src/app/model/search.model';

@Injectable()
export class SearchResolver implements Resolve<any> {

    constructor(private searchService : SearchSevice){

    }

    resolve(route:ActivatedRouteSnapshot, state : RouterStateSnapshot ):Observable<any>{
          return  this.searchService.getCountries().pipe(
              map (countries  => ({countries, hasError: false , error : null})
           )  ,
          catchError(error => {
              
              return of({countries : null, hasError: true , error });
          }))
    }
}