import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { ProyectsMultiselectResponse, RegistredProyects, AsignedProyects } from '../models/proyects.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectsService {

  constructor(private http: HttpClient, private appService: AppService) { }

  getAllProyectsMultiselect(): Observable<ProyectsMultiselectResponse> {
    return this.http.get<ProyectsMultiselectResponse>(this.appService.API_URL + 'proyectos/select-all-multiselect');
  }

  getProjectsAllTop(): Observable<any> {
    return this.http.get(this.appService.API_URL + '/calificaciones/select-all-top');
  }
  selectAllRegistredProyects(): Observable<RegistredProyects> {
    return this.http.get<RegistredProyects>(this.appService.API_URL + 'propuestas/select-all');
  }
  selectAllAsignedProyects(): Observable<AsignedProyects> {
    return this.http.get<AsignedProyects>(this.appService.API_URL + 'proyectos/terminados-pendientes');
  }
}
