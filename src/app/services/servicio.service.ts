import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../models/ListaDatos';
import { Servicio } from '../models/Servicio';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  endpoint = 'http://181.123.243.5:8080/stock-pwfe/servicio';

  constructor(private http: HttpClient) {}

  getServicios(): Observable<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(this.endpoint);
  }
}
