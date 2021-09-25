import { Component, OnInit } from '@angular/core';
import {
  NgbDateStruct,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { concatMap, tap } from 'rxjs/operators';
import { Categoria } from 'src/app/models/Categoria';
import { Persona } from 'src/app/models/Persona';
import { Servicio } from 'src/app/models/Servicio';
import { Subcategoria } from 'src/app/models/Subcategoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css'],
})
export class ServicioComponent implements OnInit {
  fechaDesde!: NgbDateStruct;
  fechaHasta!: NgbDateStruct;
  cliente: Persona = new Persona();
  empleado: Persona = new Persona();
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  servicios: Servicio[] = [];
  closeResult = '';
  empleados: Persona[] = [];
  clientes: Persona[] = [];

  //variables del formulario
  categoria: Categoria = new Categoria();
  subcategoria: Subcategoria = new Subcategoria();

  constructor(
    private modalService: NgbModal,
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private personaService: PersonaService,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      (response) => (this.categorias = response.lista),
      (error) => console.log('No se pudieron obtener las categorias')
    );

    this.personaService.getEmpleados().subscribe(
      (response) => (this.empleados = response.lista),
      (error) => console.log('No se pudo obtener la lista de empleados')
    );

    let personas: Persona[] = [];
    let empleados: Persona[] = [];

    this.personaService
      .getPersonas()
      .pipe(
        tap((res) => (personas = res.lista)),
        concatMap((res) => this.personaService.getEmpleados()),
        tap((res) => (empleados = res.lista))
      )
      .subscribe(() => {
        // console.log(personas);
        // console.log(empleados);

        for (let index = 0; index < personas.length; index++) {
          if (!this.containsObject(personas[index], empleados))
            this.clientes.push(personas[index]);
        }
      });

    this.servicioService.getServicios().subscribe(
      (response) => (this.servicios = response.lista),
      (error) => console.log('No se pudieron obtener los servicios')
    );
  }

  onChangeCategoria() {
    this.subcategoriaService.getSubCategorias(this.categoria).subscribe(
      (response) => (this.subcategorias = response.lista),
      (error) => console.log('No se pudieron obtener las subcategorias')
    );
  }

  openEmpleados(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openClientes(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private containsObject(persona: Persona, list: Persona[]) {
    for (let index = 0; index < list.length; index++) {
      if (list[index] === persona) return true;
    }
    return false;
  }

  filtrar() {
    let fechaD =
      this.fechaDesde.year.toString() +
      this.parseNumber(this.fechaDesde.month) +
      this.parseNumber(this.fechaDesde.day);

    let fechaH =
      this.fechaHasta.year.toString() +
      this.parseNumber(this.fechaHasta.month) +
      this.parseNumber(this.fechaHasta.day);

    console.log(fechaD);
    console.log(fechaH);
  }

  parseNumber(number: number): string {
    return number / 10 <= 1 ? '0' + number.toString() : number.toString();
  }
  limpiarservicio(){
    this.fechaDesde =  {
      year:0,
      month:0,
      day: 0
    };
    this.fechaHasta =  {
      year:0,
      month:0,
      day: 0
    };
    this.cliente = new Persona();
    this.empleado = new Persona();
    this.categoria = new Categoria();
    this.subcategoria = new Subcategoria();

  }
}
