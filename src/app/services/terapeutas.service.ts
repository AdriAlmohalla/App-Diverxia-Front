import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerapeutasService {

  private baseUrl: string = 'http://localhost:3000/api/terapeutas/'

  constructor(
    private httpClient: HttpClient
  ) { }

  getTerapeutasYTerapia(): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl + 'terapuetas-y-terapia')
    );
  }

  createTerapeuta(formValue: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(this.baseUrl + 'createWorker', formValue)
    )
  }

  getTerapeutaInfo(params: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl + params)
    )
  }

  deleteTerapeuta(params: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.delete<any>(this.baseUrl + 'delete/' + params)
    )
  }


}
