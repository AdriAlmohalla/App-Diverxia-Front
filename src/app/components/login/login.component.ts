import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;
  hasError: boolean;
  

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    })
    this.hasError = false
  }

  async onSubmit() {
    // enviamos los valores del formulario al servicio para el login
    const response = await this.usersService.login(this.formulario.value);
    console.log("esto es response", response)

    if (response.error) {
      this.hasError = true
    } else {
      this.hasError = false
      // si todo ha ido bien guardamos el token que recibimos en la respuesta en el localStorage
      localStorage.setItem('token_diverxia', response.token)
      localStorage.setItem('rol_usuario', response.role)
      // Usamos la libreria sweetalert2 para ofrecer una animación al usuiario de que el login ha sido correto
      Swal.fire({
        title: 'Login correcto',
        text: 'Has accedido a Diverxia',
        icon: 'success',
        confirmButtonText: 'OK!'
      })
      // dirigimos al usuario a la página de ?????????
      this.router.navigate(['/pedirCita'])
    }
  }

}
