import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Town } from 'src/app/model/town';

@Injectable({
  providedIn: 'root'
})
export class TownService {

  constructor(private conf: ConfigService, private http: HttpClient) { }

  //@ts-ignore
  public getTown() : Observable<HttpResponse<Town[]>> {
    let url = this.conf.baseUrl;
    return this.http.get<Town[]>(url, { observe: 'response' });
  }
}
