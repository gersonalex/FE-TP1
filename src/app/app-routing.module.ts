import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { FichaClinicaAgregarComponent } from './components/ficha-clinica/ficha-clinica-agregar/ficha-clinica-agregar.component';
import { FichaClinicaComponent } from './components/ficha-clinica/ficha-clinica.component';
import { ServicioComponent } from './components/servicio/servicio.component';

const routes: Routes = [
  { path: '', component: FichaClinicaComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'servicios', component: ServicioComponent },
  { path: 'agregar-ficha-clinica', component: FichaClinicaAgregarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
