import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { listadatos } from '../models/ListaDatos';
import { Persona } from '../models/Persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  endpoint = 'http://181.123.243.5:8080/stock-pwfe/persona';
  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<listadatos<Persona>> {
    let _endpoint =
      this.endpoint +
      '?ejemplo=' +
      encodeURI('{"soloUsuariosDelSistema":true}');

    return this.http.get<listadatos<Persona>>(_endpoint);
  }

  getPersonas(): Observable<listadatos<Persona>> {
    return this.http.get<listadatos<Persona>>(this.endpoint);
  }
}
