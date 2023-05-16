import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GetDateComponent } from './components/get-date/get-date.component';
import { CreateWorkerComponent } from './components/workers/create-worker/create-worker.component';
import { AdminGuard } from './guards/admin.guard';
import { CancelarCitaComponent } from './components/cancelar-cita/cancelar-cita.component';
import { DetalleCitasComponent } from './components/detalle-citas/detalle-citas.component';
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { CalendarioCitasGeneralComponent } from './components/calendario-citas-general/calendario-citas-general.component';
import { ListadoTerapeutasComponent } from './components/listado-terapeutas/listado-terapeutas.component';
import { LoginGuard } from './guards/login.guard';




const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'pedirCita', component: GetDateComponent },
  { path: 'cancelar-cita', component: CancelarCitaComponent, canActivate: [AdminGuard] },
  { path: 'crearTrabajador', component: CreateWorkerComponent, canActivate: [AdminGuard] },
  { path: 'calendarioCitas', component: CalendarioCitasGeneralComponent, canActivate: [LoginGuard] },
  { path: 'calendarioCitas/:idcita', component: DetalleCitasComponent, canActivate: [LoginGuard] },
  { path: 'crearCliente', component: CreateClientComponent },
  { path: 'listadoTerapeutas', component: ListadoTerapeutasComponent, canActivate: [AdminGuard] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
