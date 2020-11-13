import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private appService: AppService) { }

  signIn(body: any): Observable<any> {
    console.log(body);
    return this.http.post(this.appService.API_URL + 'usuarios/login', body);
  }
}
