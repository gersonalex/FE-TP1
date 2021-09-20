import { Injectable } from '@angular/core';
import { FichaClinica } from './fichaClinica';

@Injectable()
export class Servicio {
  fechaHora!: string;
  idFichaClinica!: FichaClinica;
}
