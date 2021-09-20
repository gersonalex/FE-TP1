import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { FichaClinicaComponent } from './components/ficha-clinica/ficha-clinica.component';
import { ServicioComponent } from './components/servicio/servicio.component';

const routes: Routes = [
  { path: 'servicio', component: ServicioComponent },
  { path: '', component: FichaClinicaComponent },
  { path: 'categoria', component: CategoriaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
