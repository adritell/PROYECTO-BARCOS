import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Socio } from '../../model/socio.model';
import { Barco } from '../../model/barco.model';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  constructor(private httpClient:HttpClient) { }

  getSocio(): Observable<Socio[]>{
    return this.httpClient.get<Socio[]>('http://localhost:8999/api/v1/socios').pipe(map(res => res));
  }


  
  saveSocio(request:any):Observable<any> {
    return this.httpClient.post<any>('http://localhost:8999/api/v1/socios', request);
  }
  

  updateSocio(id: number, request: any): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:8999/api/v1/socios/${id}`, request);
  }

  deleteSocio(id: number): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:8999/api/v1/socios/${id}`);
  }

  getSociosWithBarcos(): Observable<Barco[]> {
    return this.httpClient.get<Barco[]>('http://localhost:8999/api/v1/socios');
  }

}
