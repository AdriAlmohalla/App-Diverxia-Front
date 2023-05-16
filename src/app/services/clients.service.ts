import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private baseUrl: string = 'http://localhost:3000/api/clientes'

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl)
    );
  }

  putClientData(formValue: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(this.baseUrl + '/create', formValue)
    )
  }

  getClient(params: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl + '/getClient', { params })
    );
  }


  getClientById(params: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl + '/', { params })
    )
  }

  getClientByEmail(params: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl + '/getClientByEmail/' + params)
    )
  }

  getClienteInfo(params: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl + '/' + params)
    )
  }

  updatedCliente(params: any, formValue: any): Promise<any>{
    return lastValueFrom(
      this.httpClient.put<any>(this.baseUrl + '/updated/' + params, formValue)
    )
  }

}
