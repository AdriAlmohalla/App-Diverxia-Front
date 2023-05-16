import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FormCitComponent } from './components/get-date/form-cit/form-cit.component';
import { GetDateComponent } from './components/get-date/get-date.component';
import { CommonModule } from '@angular/common';
import { GetTerapeutaComponent } from './components/get-date/get-terapeuta/get-terapeuta.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { CreateWorkerComponent } from './components/workers/create-worker/create-worker.component';
import { CalendarioCitasComponent } from './components/calendario-citas/calendario-citas.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarioComponent } from './components/calendario-citas/calendario/calendario.component';
import { AdminGuard } from './guards/admin.guard';
import { GetClienteComponent } from './components/get-date/get-cliente/get-cliente.component';
import { CalendarioCitasTerapeutaComponent } from './components/calendario-citas-terapeuta/calendario-citas-terapeuta.component';
import { CalendarioCitasClienteComponent } from './components/calendario-citas-cliente/calendario-citas-cliente.component';
import { DetalleCitasComponent } from './components/detalle-citas/detalle-citas.component';
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { CalendarioCitasGeneralComponent } from './components/calendario-citas-general/calendario-citas-general.component';
import { ListadoTerapeutasComponent } from './components/listado-terapeutas/listado-terapeutas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    FormCitComponent,
    GetDateComponent,
    GetTerapeutaComponent,
    CabeceraComponent,
    CreateWorkerComponent,
    CalendarioCitasComponent,
    CalendarioComponent,
    GetClienteComponent,
    CalendarioCitasTerapeutaComponent,
    CalendarioCitasClienteComponent,
    DetalleCitasComponent,
    CreateClientComponent,
    CalendarioCitasGeneralComponent,
    ListadoTerapeutasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    // Configura LOCALE_ID como 'es'
    { provide: LOCALE_ID, useValue: 'es' },
    [AdminGuard]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
