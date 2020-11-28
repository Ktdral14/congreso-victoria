import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CalificarProyectoService {
  userData: any;
  constructor(private http: HttpClient, private appService: AppService) {
    this.userData = JSON.parse(localStorage.getItem('session-data'));
  }

  setCalifications(
    idProyecto: number,
    innovador: number,
    elementosTecnologicos: number,
    contribuye: number,
    aplicaTeorias: number,
    promueve: number,
    indice: number,
    introduccion: number,
    objetivos1: number,
    objetivos2: number,
    objetivos3: number,
    importancia1: number,
    importancia2: number,
    descripcion: number,
    identificacion: number,
    marco1: number,
    marco2: number,
    etapas: number,
    experiencia: number,
    vinculacion: number,
    impacto1: number,
    impacto2: number,
    factibilidad1: number,
    factibilidad2: number,
    factibilidad3: number,
    evidencia: number,
    resultados1: number,
    resultados2: number,
    resultados3: number,
    resultados4: number  
  ): Observable<any> {
    const body = {
      id_proyectos: idProyecto,
      id_jueces: this.userData.id_jueces,
      innovador,
      elementos_tecnologicos: elementosTecnologicos,
      contribuye,
      aplica_teorias : aplicaTeorias,
      promueve,
      indice,
      introduccion,
      objetivos1,
      objetivos2,
      objetivos3,
      importancia1,
      importancia2,
      descripcion,
      identificacion,
      marco1,
      marco2,
      etapas,
      experiencia,
      vinculacion,
      impacto1,
      impacto2,
      factibilidad1,
      factibilidad2,
      factibilidad3,
      evidencia,
      resultados1,
      resultados2,
      resultados3,
      resultados4
    };
    return this.http.post(this.appService.API_URL + 'calificaciones/registrar', body);
  }

  updateCalification(
    idProyecto: number,
    innovador: number,
    elementosTecnologicos: number,
    contribuye: number,
    aplicaTeorias: number,
    promueve: number,
    indice: number,
    introduccion: number,
    objetivos1: number,
    objetivos2: number,
    objetivos3: number,
    importancia1: number,
    importancia2: number,
    descripcion: number,
    identificacion: number,
    marco1: number,
    marco2: number,
    etapas: number,
    experiencia: number,
    vinculacion: number,
    impacto1: number,
    impacto2: number,
    factibilidad1: number,
    factibilidad2: number,
    factibilidad3: number,
    evidencia: number,
    resultados1: number,
    resultados2: number,
    resultados3: number,
    resultados4: number
  ): Observable<any> {
    const body = {
      id_proyectos: idProyecto,
      id_jueces: this.userData.id_jueces,
      innovador,
      elementos_tecnologicos: elementosTecnologicos,
      contribuye,
      aplica_teorias : aplicaTeorias,
      promueve,
      indice,
      introduccion,
      objetivos1,
      objetivos2,
      objetivos3,
      importancia1,
      importancia2,
      descripcion,
      identificacion,
      marco1,
      marco2,
      etapas,
      experiencia,
      vinculacion,
      impacto1,
      impacto2,
      factibilidad1,
      factibilidad2,
      factibilidad3,
      evidencia,
      resultados1,
      resultados2,
      resultados3,
      resultados4
    };
    return this.http.put(this.appService.API_URL + 'calificaciones/actualizar', body);
  }

  obtenerProyectosCalificados(): Observable<any> {
    const body = {
      id_jueces: this.userData.id_jueces
    };
    return this.http.post(this.appService.API_URL + 'proyectos/calificados-pendientes', body);
  }

  getProyectoCalificado(idProyectos: string): Observable<any> {
    const body = {
      id_proyectos: idProyectos,
      id_jueces: this.userData.id_jueces
    };
    return this.http.post(this.appService.API_URL + 'proyectos/calificados-pendientes-one', body);
  }
  getCalificaciones(idProyectos): Observable<any> {
    const body = {
      id_proyectos: idProyectos,
      id_jueces: this.userData.id_jueces
    };
    return this.http.post(this.appService.API_URL + 'calificaciones/select-one', body);
  }
}
