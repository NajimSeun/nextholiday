import {  Routes} from "@angular/router";
import { DetailComponent } from "./app/detail/detail.component";
import { DetailResolver } from "./services/detail.resolver.service";
import { HolidayResolver } from "./services/holiday.resolver.service";
import { SearchBarComponent } from './app/search/search.component';
import { SearchResolver } from './services/search.resolver.service';
import { LocationResolver } from './services/location.resolver.service';


export const AppRoutes : Routes = [
    {path : "holiday/search"  ,  component : SearchBarComponent , resolve : {searchResponseData : SearchResolver , locationResponseData:LocationResolver}   },
    {path : "holiday/next/:countryCode" , component : DetailComponent , 
    resolve:{detailResponseData: DetailResolver , holidayResponseData: HolidayResolver}},
    {path :"" , redirectTo : "holiday/search" , pathMatch :"full"}
]