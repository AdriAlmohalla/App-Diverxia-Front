import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private baseUrl: string = 'http://localhost:3000/api/horarios'

  constructor(
    private httpClient: HttpClient
  ) { }

  getCitasDisponibles(formValue: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(this.baseUrl + '/hours', formValue)
    );
  }

}
