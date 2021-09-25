import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaClinica } from '../models/FichaClinica';
import { listadatos } from '../models/ListaDatos';
import { Persona } from '../models/Persona';
import { Reserva } from '../models/Reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private endpoint = 'http://181.123.243.5:8080/stock-pwfe/reserva';
  filtro: string = '';

  constructor(private http: HttpClient) {}

  getReservas(): Observable<listadatos<Reserva>> {
    return this.http.get<listadatos<Reserva>>(this.endpoint);
  }

  getReservasRangoFechas(
    fechaDesde: string,
    fechaHasta: string
  ): Observable<listadatos<Reserva>> {
    let _endpoint =
      this.endpoint +
      encodeURI('?ejemplo={"fechaDesdeCadena":"' +
      fechaDesde +
      '","fechaHastaCadena":"' +
      fechaHasta +
      '"}');

    return this.http.get<listadatos<Reserva>>(_endpoint);
  }

  getReservasFiltro(
    empleado: Persona,
    cliente: Persona,
    fechaDesde: string,
    fechaHasta: string
  ): Observable<listadatos<Reserva>> {
    this.filtro = '?ejemplo={';
    if(cliente.idPersona!=undefined){
      this.filtro=this.filtro+'"idCliente":{"idPersona":' + cliente.idPersona + '}';
    }
    if(empleado.idPersona!=undefined){
      //si el filtro no esta vacio agrega la coma
      if(this.filtro != '?ejemplo={'){
        this.filtro=this.filtro+',';
      }else{
        //this.filtro=this.filtro+'?';
      }
      this.filtro=this.filtro+'"idEmpleado":{"idPersona":' + empleado.idPersona + '}';
    }
    if(fechaDesde!=''){
      //si el filtro no esta vacio agrega la coma
      if(this.filtro != '?ejemplo={'){
        this.filtro=this.filtro+',';
      }else{
        //this.filtro=this.filtro+'?';
      }
      this.filtro=this.filtro+'"fechaDesdeCadena":'+fechaDesde;
    }
    if(fechaHasta!=''){
      //si el filtro no esta vacio agrega la coma
      if(this.filtro != '?ejemplo={'){
        this.filtro=this.filtro+',';
      }else{
        //this.filtro=this.filtro+'?';
      }
      this.filtro=this.filtro+'"fechaHastaCadena":'+fechaHasta;
    }
    let _endpoint =
      this.endpoint +
      encodeURI(this.filtro) + '}';

    return this.http.get<listadatos<Reserva>>(_endpoint);
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

  putReserva(reserva: Reserva, observacion: String): Observable <any> {
    let data = {
      idReserva: reserva.idReserva,
      observacion: observacion,
      flagAsistio: "S"
    };

    const httpHeaders = new HttpHeaders().append('Content-Type', 'application/json').append('usuario', 'usuario2');

    return this.http
      .put<Reserva>(this.endpoint, data, { headers: httpHeaders });
  }


  deleteReserva(reserva: Reserva): Observable <any>{

    const httpHeaders = new HttpHeaders().append('Content-Type', 'application/json').append('usuario', 'usuario2');

    return this.http
      .delete<Reserva>(this.endpoint+'/'+reserva.idReserva, { headers: httpHeaders });
  }

}
