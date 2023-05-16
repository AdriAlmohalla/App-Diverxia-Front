import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { CitasService } from 'src/app/services/citas.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-calendario-citas-cliente',
  templateUrl: './calendario-citas-cliente.component.html',
  styleUrls: ['./calendario-citas-cliente.component.css']
})
export class CalendarioCitasClienteComponent {

  token!: ''
  decodedToken: any
  dates: any
  clienteInfo: any

  constructor(
    private citasService: CitasService) {

  }

  async ngOnInit() {
    const tokenInfo = this.decodeToken();
    const dates = await this.citasService.getDatesByCliente(tokenInfo.user_id);
    this.dates = dates;
    console.log('Información del token calendario cliente:', tokenInfo);
    console.log('calendario cliente', this.dates);
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

}
