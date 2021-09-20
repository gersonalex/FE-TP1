import { Categoria } from './Categoria';
import { Persona } from './Persona';
import { Subcategoria } from './Subcategoria';

export class FichaClinica {
  fechaHora!: string;
  idEmpleado!: Persona;
  idCliente!: Persona;
  //   idCategoria!: Categoria;
  idTipoProducto!: Subcategoria;
}
