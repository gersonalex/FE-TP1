import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { listadatos } from '../models/ListaDatos';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private endpoint = 'http://181.123.243.5:8080/stock-pwfe/categoria';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<listadatos<Categoria>> {
    return this.http.get<listadatos<Categoria>>(this.endpoint);
  }

  postCategoria(c: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.endpoint, c).pipe(
      tap(
        (data) => console.log('added: ' + data),
        (error) => console.log('error: ' + error)
      )
    );
  }
}
