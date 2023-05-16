import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-get-cliente',
  templateUrl: './get-cliente.component.html',
  styleUrls: ['./get-cliente.component.css']
})
export class GetClienteComponent {

  form: FormGroup;
  @Output() enviarObjeto = new EventEmitter<any>();
  clientes: any;

  constructor(private clientsService: ClientsService){
    this.form = new FormGroup({
    email: new FormControl('', [Validators.required])
    })
  }

  async ngOnInit(){
    const request = await this.clientsService.getAll();
    this.clientes = request;
    console.log(this.clientes);
  }

  onSubmit(){
    const clientesFiltrado = [];
    for(let cliente of this.clientes){
      if(cliente.email === this.form.value.email){
        clientesFiltrado.push(cliente);
        /* console.log('linea 34', this.form.value.email) */
      }
      /* console.log('linea 36', this.form.value.email) */
    }
    console.log('linea37, cliente', clientesFiltrado)
    console.log(clientesFiltrado);
    this.enviarObjeto.emit(clientesFiltrado);
    console.log(this.form.value.email)
  }

}
