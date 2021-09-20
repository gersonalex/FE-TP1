import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaClinicaComponent } from './components/ficha-clinica/ficha-clinica.component';
import { ServicioComponent } from './components/servicio/servicio.component';

const routes: Routes = [
  { path: 'servicio', component: ServicioComponent },
  { path: '', component: FichaClinicaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
