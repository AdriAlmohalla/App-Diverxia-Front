import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {


  usuario!: string | null;


  constructor(public usersService: UsersService,
    private router: Router) {

  }



  cerrarSesion() {

    localStorage.removeItem('token_diverxia');
    localStorage.removeItem('rol_usuario');

    Swal.fire({
      icon: 'success',
      title: 'Has cerrado sesión',
      showConfirmButton: false,
      timer: 1500
    })

    this.router.navigate(['/login']);

  }





}
