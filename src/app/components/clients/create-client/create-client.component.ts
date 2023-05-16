import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchPassword } from 'src/app/validator/matchPassword.validator';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create-client',
    templateUrl: './create-client.component.html',
    styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {

    form!: FormGroup;
    mensajeError: string = '';
    trabajadorCreado: boolean = false;
    hasError: boolean = false;
    defaultValue: string = "usuario";


    constructor(
        private clientService: ClientsService,
        private httpClient: HttpClient,
        private router: Router) {
        this.form = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required]),
            nombre: new FormControl('', [Validators.required]),
            apellidos: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            telefono: new FormControl('', [Validators.required, Validators.maxLength(9)])
        },
            //importamos el validador creado para cotejar que password y confirmPassword coinciden
            { validators: matchPassword }
        )
    }

    async ngOnInit() {

    }


    async onSubmit() {

        console.log('this.form.value: ', this.form.value);
        const email = this.form.value.email;
        console.log('this.form.value.email: ', this.form.value.email)
        const user = await this.clientService.updatedCliente(email, this.form.value);
        console.log('user: ', user)
        const response = await this.clientService.putClientData(this.form.value);
        console.log('response: ', response);

        if (user.affectedRows === 0 || user.error) {
            if (user.error) {
                this.hasError = true;
            }
            if (response.error) {
                this.hasError = true
            } else {
                this.hasError = false;
                if (response) {

                    Swal.fire({
                        title: 'Cliente creado',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })

                    this.router.navigate(['/calendarioCitas'])
                }

            }

        } else {
            this.hasError = false;
            if (user) {

                Swal.fire({
                    title: 'Cliente creado',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })

                this.router.navigate(['/calendarioCitas'])

            }
        }





    }

}
