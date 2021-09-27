import { Component, OnInit } from '@angular/core';
import {
  NgbDateStruct,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { concatMap, tap } from 'rxjs/operators';
import { Categoria } from 'src/app/models/Categoria';
import { Persona } from 'src/app/models/Persona';
import { Subcategoria } from 'src/app/models/Subcategoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FichaClinicaService } from 'src/app/services/ficha-clinica.service';
import { PersonaService } from 'src/app/services/persona.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';

@Component({
  selector: 'app-ficha-clinica-modificar',
  templateUrl: './ficha-clinica-modificar.component.html',
  styleUrls: ['./ficha-clinica-modificar.component.css'],
})
export class FichaClinicaModificarComponent implements OnInit {
  fecha!: NgbDateStruct;
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  empleados: Persona[] = [];
  clientes: Persona[] = [];
  closeResult = '';
  //variables del formulario
  categoria: Categoria = new Categoria();
  subcategoria: Subcategoria = new Subcategoria();
  cliente: Persona = new Persona();
  empleado: Persona = new Persona();
  motivo: string = '';
  diagnostico: string = '';
  observacion: string = '';

  constructor(
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private personaService: PersonaService,
    private fichaClinicaService: FichaClinicaService,
    private modalService: NgbModal,
    private _location: Location
  ) {}

  ngOnInit(): void {}

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

  guardarFichaClinica(): void {
    this.fichaClinicaService.postFichaClinica(
      this.motivo,
      this.diagnostico,
      this.observacion,
      this.empleado,
      this.cliente,
      this.subcategoria
    );
    this.categoria = new Categoria();
    this.subcategoria = new Subcategoria();
    this.cliente = new Persona();
    this.empleado = new Persona();
    this.motivo = '';
    this.diagnostico = '';
    this.observacion = '';
  }

  back(): void {
    this._location.back();
  }
}
