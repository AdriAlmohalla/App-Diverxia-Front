import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';
import { HorariosService } from 'src/app/services/horarios.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode';
import { ClientsService } from 'src/app/services/clients.service';


@Component({
  selector: 'app-get-date',
  templateUrl: './get-date.component.html',
  styleUrls: ['./get-date.component.css']
})
export class GetDateComponent {

  clienteParaNuevaCita: any;
  terapiaYTerapeuta: any;
  horariosDisponibles: any;
  formulario: FormGroup;
  hasError: boolean
  horarioActual: string = '';
  mostrarDiv = true;
  isLoading: boolean = false;
  decodedToken: any

  constructor(
    private horariosService: HorariosService,
    private citasService: CitasService,
    private usersService: UsersService,
    private clientsServices: ClientsService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      id_tramo_horario: new FormControl('', Validators.required),
      tramo_horario: new FormControl('', Validators.required)
    })
    this.hasError = false
  }

  async ngOnInit() {
    let rol = localStorage.getItem('rol_usuario');
    const tokenInfo = this.decodeToken();

    if (rol === 'usuario') {
      console.log(tokenInfo.user_id)
      this.clienteParaNuevaCita = await this.clientsServices.getClienteInfo(tokenInfo.user_id)
      // Oculta el div al recibir los datos
      this.mostrarDiv = false;
    }
  }

  decodeToken(): any {
    const token = localStorage.getItem('token_diverxia');

    if (!token) {
      return null;
    }

    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error al desencriptar el token:', error);
      return null;
    }
  }

  recibirDatos(objeto: any) {
    this.clienteParaNuevaCita = objeto;
    console.log(this.clienteParaNuevaCita)
    // Oculta el div al recibir los datos
    this.mostrarDiv = false;
  }

  async recibirDatosTerapia(objeto: any) {
    this.terapiaYTerapeuta = objeto;
    const obj = {
      id_terapeuta: Number(this.terapiaYTerapeuta.id_terapeuta),
      dia: this.terapiaYTerapeuta.dia.toString()
    }
    console.log(obj)
    this.horariosDisponibles = await this.horariosService.getCitasDisponibles(obj)
    console.log(this.horariosDisponibles)
  }

  seleccionarHorario(horario: any) {
    this.horarioActual = horario.id;
    this.formulario.patchValue({ id_tramo_horario: horario.id });
    this.formulario.patchValue({ tramo_horario: horario.hora_inicio });
  }

  formatoHora(hora: string): string {
    return hora.slice(0, -3);
  }

  async onSubmit() {

    // Establecer isLoading a true cuando se envíe el formulario
    this.isLoading = true;

    const date = {
      dia: this.terapiaYTerapeuta.dia,
      id_terapeuta: this.terapiaYTerapeuta.id_terapeuta,
      id_usuario: this.clienteParaNuevaCita.id_usuario,
      id_tramo_horario_45: this.horariosDisponibles[0].es_psicologo ? null : this.formulario.value.id_tramo_horario,
      id_tramo_horario_60: this.horariosDisponibles[0].es_psicologo ? this.formulario.value.id_tramo_horario : null
    }

    const infoDate = {
      emailPaciente: this.clienteParaNuevaCita.email,
      id_terapeuta: this.terapiaYTerapeuta.id_terapeuta,
      dia: this.terapiaYTerapeuta.dia,
      hora: this.formulario.value.tramo_horario
    }

    console.log(date)
    console.log(infoDate)
    const response = await this.citasService.createDate(date)
    const responseEmail = await this.usersService.sendEmailDateReservation(infoDate)
    console.log(response)
    if (response.error) {
      this.hasError = true
    } else {
      // Establecer isLoading a false cuando la respuesta llegue
      this.isLoading = false;
      this.hasError = false
      // Usamos la libreria sweetalert2 para ofrecer una animación al usuiario de que la cita ha sido correta
      Swal.fire({
        title: 'Cita reservada correctamente',
        text: `Se ha enviado un email a ${this.clienteParaNuevaCita.email}`,
        icon: 'success',
        confirmButtonText: 'OK!'
      })
      // dirigimos al usuario a la página de login
      this.router.navigate(['/calendarioCitas'])
    }

  }



}
