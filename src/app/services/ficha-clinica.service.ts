import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaClinica } from '../models/fichaClinica';
import { listadatos } from '../models/ListaDatos';

@Injectable({
  providedIn: 'root',
})
export class FichaClinicaService {
  private endpoint = 'http://181.123.243.5:8080/stock-pwfe/fichaClinica';

  constructor(private http: HttpClient) {}

  getFichasClinicas(): Observable<listadatos<FichaClinica>> {
    return this.http.get<listadatos<FichaClinica>>(this.endpoint);
  }

  getFichasRangoFechas(
    fechaDesde: string,
    fechaHasta: string
  ): Observable<listadatos<FichaClinica>> {
    let _endpoint =
      this.endpoint +
      '?ejemplo={"fechaDesdeCadena":"' +
      fechaDesde +
      '","fechaHastaCadena":"' +
      fechaHasta +
      '"}';

    return this.http.get<listadatos<FichaClinica>>(_endpoint);
  }

  getFichasPaciente(idPersona: number): Observable<listadatos<FichaClinica>> {
    let _endpoint =
      this.endpoint + '?ejemplo={"idCliente":{"idPersona":' + idPersona + '}}';
    return this.http.get<listadatos<FichaClinica>>(_endpoint);
  }

  getFichasFisioterapeuta(
    idEmpleado: number
  ): Observable<listadatos<FichaClinica>> {
    let _endpoint =
      this.endpoint +
      '?ejemplo={"idEmpleado":{"idPersona":' +
      idEmpleado +
      '}}';
    return this.http.get<listadatos<FichaClinica>>(_endpoint);
  }

  getFichasSubcategoria(
    idSubcategoria: number
  ): Observable<listadatos<FichaClinica>> {
    let _endpoint =
      this.endpoint +
      '?ejemplo={"idTipoProducto":{"idTipoProducto":' +
      idSubcategoria +
      '}}';
    return this.http.get<listadatos<FichaClinica>>(_endpoint);
  }
}
