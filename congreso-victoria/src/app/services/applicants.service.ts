import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantsService {

  constructor(private http: HttpClient, private appService: AppService) { }

  registroPropuesta(body: any): Observable<any> {
    return this.http.post(this.appService.API_URL + 'propuestas/registrar', body);
  }
}
