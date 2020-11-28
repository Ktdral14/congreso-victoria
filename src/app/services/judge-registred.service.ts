import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { JudgeSelectAll } from '../models/judge.model';

@Injectable({
  providedIn: 'root'
})
export class JudgeRegistredService {

  constructor(private http: HttpClient, private appService: AppService) { }


  selectAllJudgesRegistred(): Observable<JudgeSelectAll> {
    return this.http.get<JudgeSelectAll>(this.appService.API_URL + 'jueces/select-all');
  }
  editJudgesRegistred(body: any): Observable<any> {
    return this.http.put(this.appService.API_URL + 'jueces/actualizar', body);
  }
}
