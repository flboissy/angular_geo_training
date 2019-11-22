import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { TownListComponent } from './components/town-list/town-list.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TownService } from './services/town/town.service';
import { ConfigService } from './services/config/config.service';
import { of, Observable, ObservableInput } from '../../node_modules/rxjs';
import { map, catchError } from 'rxjs/operators';

function load(http: HttpClient, config: ConfigService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
       http.get('./config.json')
         .pipe(
           map((x: ConfigService) => {
             config.baseUrl = x.baseUrl;
             resolve(true);
           }),
           catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
             if (x.status !== 404) {
               resolve(false);
             }
             config.baseUrl = 'https://geo.api.gouv.fr';
             resolve(true);
             return of({});
           })
         ).subscribe();
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    TownListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    TownService,
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      multi: true,
      deps: [
        HttpClient,
        ConfigService
      ]
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
