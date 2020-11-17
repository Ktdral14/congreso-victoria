import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private http: HttpClient, private appService: AppService) { }

  registerProposal(body: any): Observable<any> {
    return this.http.post(this.appService.API_URL + 'proyectos/registrar', body);
  }
}
