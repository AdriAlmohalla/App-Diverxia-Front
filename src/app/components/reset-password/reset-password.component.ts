import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  formulario: FormGroup;
  hasError: boolean

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      email: new FormControl(),
    })
    this.hasError = false
  }

  async onSubmit() {
    // enviamos los valores del formulario al servicio para el login
    const response = await this.usersService.resetPassword(this.formulario.value)
    if (response.error) {
      this.hasError = true
    } else {
      this.hasError = false
      // Usamos la libreria sweetalert2 para ofrecer una animación al usuiario de que el login ha sido correto
      Swal.fire({
        title: `Se ha enviado un correo a ${this.formulario.value.email}`,
        text: 'Reestablece tu contraseña',
        icon: 'success',
        confirmButtonText: 'OK!'
      })
      // dirigimos al usuario a la página de login
      this.router.navigate(['/login'])
    }
  }

}
