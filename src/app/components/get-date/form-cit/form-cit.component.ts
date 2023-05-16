import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-form-cit',
  templateUrl: './form-cit.component.html',
  styleUrls: ['./form-cit.component.css']
})
export class FormCitComponent implements OnInit {

  form!: FormGroup;
  @Output() enviarObjeto = new EventEmitter<any>();
  user: any;
  allClients: any;
  datosCliente: any;
  mostrarDiv: boolean = true;

  constructor(private formBuilder: FormBuilder, private clientsServices: ClientsService,
    public usersService: UsersService) {

  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      telefono: new FormControl('', Validators.required),
    });
  }

  buscarClientes(objeto: any) {
    /* this.datosCliente = this.clientsServices.getClientByEmail(objeto); */
    this.form.patchValue({ nombre: objeto[0].nombre }),
      this.form.patchValue({ apellidos: objeto[0].apellidos }),
      this.form.patchValue({ telefono: objeto[0].telefono }),
      this.form.patchValue({ email: objeto[0].email })

    console.log(this.datosCliente);
    console.log(objeto)
  }


  async onSubmit() {
    const { nombre, apellidos, email, telefono } = this.form.value;

    const swalResult = await Swal.fire({
      title: 'Estos datos son correctos',
      html: `Nombre: ${nombre}<br>Apellidos: ${apellidos}<br>Email: ${email}<br>Teléfono: ${telefono}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Sí'
    });


    if (swalResult.isConfirmed) {
      const email = this.form.value.email;
      console.log('linea 53', email);
      const params = new HttpParams().set('email', email);
      console.log('params', params);
      const request = await this.clientsServices.getClient(params);
      // const request = await this.clientsServices.getClientByEmail(email);
      console.log('linea56', request);

      if (request) {
        this.enviarObjeto.emit(request);
      } else {
        const response = await this.clientsServices.putClientData(this.form.value);
        console.log(response);
        if (response.error) {
          console.log(response.error);
        } else {
          this.enviarObjeto.emit(response);
        }
      }
    } else if (swalResult.isDismissed) {
      // Recarga la página si el usuario selecciona 'No'.
      location.reload();
    }
  }
}


