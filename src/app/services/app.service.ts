import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
  API_URL = 'http://mante.hosting.acm.org/api-premio-estatal-2020/public/';
  // API_URL = 'http://plataforma.cotacyt.gob.mx/api-premio-estatal-2020/public/';
  API_CP_URL = 'https://api-sepomex.hckdrk.mx/query/info_cp/';
}
