import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ListComponent} from "./list/list.component" ;
import {SearchBarComponent} from "./search/search.component" ;
import {RouterModule} from '@angular/router' ;
import {DetailComponent} from './detail/detail.component' ;
import { AppRoutes}  from "src/route.config"
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { SearchSevice } from 'src/services/search.service';
import { SearchResolver } from 'src/services/search.resolver.service';
import { DetailAndHolidayService } from 'src/services/detail&holiday.service';
import { HolidayResolver } from 'src/services/holiday.resolver.service';
import { DetailResolver } from 'src/services/detail.resolver.service';
import { LocationResolver } from "src/services/location.resolver.service";
@NgModule({
  declarations: [
    AppComponent,
    ListComponent, 
    SearchBarComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule
  ],
  providers: [SearchSevice,SearchResolver, DetailAndHolidayService , HolidayResolver , DetailResolver,LocationResolver ],
  bootstrap: [AppComponent]
})
export class AppModule { }
