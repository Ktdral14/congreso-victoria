import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddJudgeService {

  constructor(private http: HttpClient, private appService: AppService) { }

  registerJudge(body: any): Observable<any> {
    return this.http.post(this.appService.API_URL + 'jueces/registrar', body);
  }
}
