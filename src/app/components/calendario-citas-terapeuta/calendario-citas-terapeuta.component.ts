import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { CitasService } from 'src/app/services/citas.service';
import { TerapeutasService } from 'src/app/services/terapeutas.service';

@Component({
  selector: 'app-calendario-citas-terapeuta',
  templateUrl: './calendario-citas-terapeuta.component.html',
  styleUrls: ['./calendario-citas-terapeuta.component.css']
})
export class CalendarioCitasTerapeutaComponent {

  token!: ''
  decodedToken: any
  dates: any
  terapeutaInfo: any

  constructor(
    private citasService: CitasService,
    private terapeutasService: TerapeutasService
  ) {

  }

  async ngOnInit() {
    const tokenInfo = this.decodeToken();
    this.terapeutaInfo = await this.terapeutasService.getTerapeutaInfo(tokenInfo.user_id)
    console.log(this.terapeutaInfo)
    const dates = await this.citasService.getDatesByTerapeuta(this.terapeutaInfo.id);
    this.dates = dates;
    console.log('Información del token:', tokenInfo);
    console.log(this.dates);
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
