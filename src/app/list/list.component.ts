

import { Component } from "@angular/core";
import { Input } from "@angular/core";
@Component({
    selector :"list",
    templateUrl :"./list.component.html",
    styleUrls : ["./list.component.css"]
})
export  class ListComponent {



    constructor(){}

    @Input() countries ;


    countrySelected (){
        
    }
}
