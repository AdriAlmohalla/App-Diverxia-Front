import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { TerapeutasService } from 'src/app/services/terapeutas.service';
import { TerapiasService } from 'src/app/services/terapias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-worker',
  templateUrl: './create-worker.component.html',
  styleUrls: ['./create-worker.component.css']
})
export class CreateWorkerComponent {

  form!: FormGroup;
  mensajeError: string = '';
  trabajadorCreado: boolean = false;
  terapias: any;
  hasError: boolean = false;


  constructor(private terapiasService: TerapiasService,
    private terapeutasService: TerapeutasService,
    private httpClient: HttpClient,
    private router: Router) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rol: new FormControl('trabaj', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      formacion: new FormControl('', [Validators.required]),
      id_terapia: new FormControl('', [Validators.required]),
      experiencia: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  async ngOnInit() {
    const request = await this.terapiasService.getTerapias();
    this.terapias = request;
    console.log(this.terapias.id)
  }


  async onSubmit() {

    console.log(this.form.value);
    const response = await this.terapeutasService.createTerapeuta(this.form.value);
    console.log(response);
    if (response.error) {
      this.hasError = true
    } else {
      this.hasError = false;

      Swal.fire({
        title: 'Trabajador creado',
        icon: 'success',
        confirmButtonText: 'OK'
      })

      this.router.navigate(['/calendarioCitas'])
    }
  }

}
