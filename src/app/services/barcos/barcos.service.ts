import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Socio } from '../../model/socio.model';
import { Barco } from '../../model/barco.model';

@Injectable({
  providedIn: 'root'
})
export class BarcosService {

  private baseUrl = 'http://localhost:8999/api/v1/barcos'; 


  constructor(private httpClient:HttpClient) { }

  getSocioByBarcoId(barcoId: number): Observable<Socio> {
    const url = `${this.baseUrl}/${barcoId}/socio`;
    return this.httpClient.get<Socio>(url);
  }


  getBarcos(): Observable<Barco[]>{
    return this.httpClient.get<Barco[]>(this.baseUrl).pipe(map(res => res));
  }


  
  saveBarco(request:any):Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, request);
  }
  

  updateBarco(id: number, request: any): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:8999/api/v1/barcos/${id}`, request);
  }

  deleteBarco(id: number): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:8999/api/v1/barcos/${id}`);
  }
}
