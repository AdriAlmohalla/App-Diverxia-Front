import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  formulario: FormGroup;
  hasError: boolean
  token!: ''
  decodedToken: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {
    this.formulario = new FormGroup({
      password: new FormControl('', Validators.required),
      comparePassword: new FormControl('', Validators.required),
    }, [this.passwordCompare])
    this.hasError = false
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.token = params['token'];
      // Ahora puedes usar el token para realizar acciones en tu componente
      try {
        this.decodedToken = jwt_decode.default(this.token);
        // Ahora puedes acceder a los datos en el token desencriptado
      } catch (error) {
        // Maneja el error en caso de que el token sea inválido
        console.error('Error al desencriptar el token:', error);
      }
    });

  }

  async onSubmit() {

    const passwordUpdateObject = {
      id_usuario: this.decodedToken.user_id,
      newPassword: this.formulario.value.password
    }

    // enviamos el id de usuario para hacer el r
    const response = await this.usersService.updatePassword(passwordUpdateObject)
    if (response.error) {
      this.hasError = true
    } else {
      this.hasError = false
      // Usamos la libreria sweetalert2 para ofrecer una animación al usuiario de que el login ha sido correto
      Swal.fire({
        title: `Se ha reestablecido tu contraseña`,
        icon: 'success',
        confirmButtonText: 'OK!'
      })
      // dirigimos al usuario a la página de login
      this.router.navigate(['/login'])
    }
  }

  // con esta función comparamos los dos campos de contraseña del formulurio y devolvemos null si son iguales para así confirmarlo
  passwordCompare(formulario: AbstractControl): any {
    const password: string = formulario.get('password')?.value
    const comparePassword: string = formulario.get('comparePassword')?.value

    if (password !== comparePassword) {
      // retornamos passwordcompare: true para poder poner un aviso en html si las contraseñas no son correctas
      return { 'passwordcompare': true }
    }
    return null
  }

}
