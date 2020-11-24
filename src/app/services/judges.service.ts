import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { JudgeMultiselectResponse } from '../models/judge.model';

@Injectable({
  providedIn: 'root'
})
export class JudgesService {

  constructor(private http: HttpClient, private appService: AppService) { }

  getAllJudgesSelect(): Observable<JudgeMultiselectResponse> {
    return this.http.get<JudgeMultiselectResponse>(this.appService.API_URL + 'jueces/select-all-multiselect');
  }
  asignProyectsAtJudge(body: any): Observable<any> {
    return this.http.post(this.appService.API_URL + 'jueces/asignar-proyectos', body);
  }
}
