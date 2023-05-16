import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerapiasService {

  private baseUrl: string = 'http://localhost:3000/api/'

  constructor(private httpClient: HttpClient) { }

  getTerapias(): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl + 'terapias')
    )
  };

  getTerapiasById(params: any): Promise<any>{
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl + 'terapias/' + params)
    )
  }
}
