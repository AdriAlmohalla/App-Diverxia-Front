import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private baseUrl: string = 'http://localhost:3000/api/citas/'

  constructor(
    private httpClient: HttpClient
  ) { }

  createDate(formValue: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(this.baseUrl + 'create', formValue)
    );
  }

  getDatesByTerapeuta(params: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl + 'terapeuta/' + params)
    );
  }

  getDatesByCliente(params: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl + 'cliente/' + params)
    );
  }

  getClient(params: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl + '/getClient', { params })
    );
  }
  deleteCita(params: any): Promise<any> {
    console.log(params);
    return lastValueFrom(

      this.httpClient.delete<any>(this.baseUrl + 'deleteDate/' + params)
    )
  }

  sendEmailsDeleteCita(params: any): Promise<any> {
    console.log(params);
    return lastValueFrom(
      this.httpClient.delete<any>(this.baseUrl + 'deleteEmail/' + params)
    )
  }

}
