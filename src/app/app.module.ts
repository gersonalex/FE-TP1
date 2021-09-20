import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FichaClinicaComponent } from './components/ficha-clinica/ficha-clinica.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { ReservaComponent } from './components/reserva/reserva.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaComponent } from './components/categoria/categoria.component';

@NgModule({
  declarations: [
    AppComponent,
    FichaClinicaComponent,
    NavbarComponent,
    ServicioComponent,
    ReservaComponent,
    CategoriaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
