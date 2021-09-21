import { Persona } from './Persona';


export class Reserva {
  fecha!: string;
  idEmpleado!: Persona;
  idCliente!: Persona;
  observacion!: string;
}
