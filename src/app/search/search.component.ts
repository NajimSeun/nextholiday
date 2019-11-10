import { Component } from "@angular/core"
import { ActivatedRoute } from '@angular/router';
import { from, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, toArray } from 'rxjs/operators';
import { filter } from 'rxjs/operators';


@Component({
    selector: "searchbar",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"]
})
export class SearchBarComponent {
    countries: any;
    filteredCountries: any;
    countriesObsrvable: Observable<any>;
    currentCountryCode: any ;
    error:string ="" ;
    hasError:boolean = false ;
    constructor(private route: ActivatedRoute) { }


    ngOnInit() {
        this.route.data.subscribe(({searchResponseData, locationResponseData}) => {
            
            if (!searchResponseData.hasError) {
                this.countries = searchResponseData.countries;
                this.filteredCountries = this.countries;
                this.countriesObsrvable = from(this.countries);
                this.makeSearchable();
            } else {
                
                this.hasError = this.hasError || true  ;
                this.error = `${this.error} error loading countries,`
            }

          if(!locationResponseData.hasError){
           this.currentCountryCode = locationResponseData.country_code;
           
          } else{
            this.hasError = this.hasError || true;
            this.error = `${this.error} error loading location`;
          }
        })

    }

    private makeSearchable(): void {
        const searchInput = document.querySelector("#search-input");
        fromEvent(searchInput, "input").pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(event => this.filterCountries((<HTMLInputElement>event.target).value.trim()))

        ).subscribe(result => this.filteredCountries = result)

    }

    private filterCountries(searchTerm: string): Observable<any> {
        return this.countriesObsrvable.pipe(
            filter((country: any) => {
                console.log(country.name)
                return searchTerm === "" ? true : country.name.startsWith(searchTerm)
            }),
            toArray()
        )
    }
}