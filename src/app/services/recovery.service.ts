import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  constructor(private http: HttpClient, private appConfig: AppService) { }
  recoveryPass(correo: string): Observable<any> {
    const body = {
      correo
    };

    return this.http.put(this.appConfig.API_URL + 'usuarios/recuperar-contrasena', body);
  }
}
