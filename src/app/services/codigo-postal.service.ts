import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { CpInfo, CpRespuest } from '../models/cp.model';

@Injectable({
  providedIn: 'root'
})
export class CodigoPostalService {

  constructor(private http: HttpClient, private appService: AppService) { }


  consultCP(cp: string): Observable<CpRespuest[]> {
    return this.http.get<CpRespuest[]>(this.appService.API_CP_URL + cp);
  }
}
