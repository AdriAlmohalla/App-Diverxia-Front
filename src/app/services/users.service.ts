import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = 'http://localhost:3000/api/usuarios/'

  constructor(
    private httpClient: HttpClient
  ) { }

  // Con esta llamada post enviamos el formulario con los datos de login
  login(formValue: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(this.baseUrl + 'login', formValue)
    );
  }

  // Con esta llamada post enviamos el formulario con el email para poder enviar el reestablecimiento de la contraseña
  resetPassword(formValue: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(this.baseUrl + 'resetPassword', formValue)
    );
  }

  sendEmailDateReservation(formValue: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(this.baseUrl + 'sendEmailbookDate', formValue)
    );
  }

  updatePassword(formValue: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<any>(this.baseUrl + 'updatePassword', formValue)
    );
  }


  isAdmin(): boolean {
    let rol = localStorage.getItem('rol_usuario');
    if (rol === 'admin') {
      return true;
    }
    return false;
  }

  isUser(): boolean {
    let rol = localStorage.getItem('rol_usuario');

    if (rol === 'usuario') {
      return true;
    }
    return false;
  }


  isWorker(): boolean {
    let rol = localStorage.getItem('rol_usuario');

    if (rol === 'trabaj') {
      return true;
    }
    return false;
  }

  isLog(): boolean {
    let rol = localStorage.getItem('token_diverxia');

    if (rol) {
      return true;
    } return false;
  }

  isNotLog(): boolean {
    let rol = localStorage.getItem('token_diverxia');

    if (rol) {
      return false;
    } return true;
  }

}
