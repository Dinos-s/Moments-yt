import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMoment } from '../IMoment';
import { environment } from 'src/environments/environment';
import { IResponse } from '../IResponse';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`

  constructor(private http: HttpClient) { }

  getMoments(): Observable<IResponse<IMoment[]>> {
    return this.http.get<IResponse<IMoment[]>>(this.apiUrl)
  }//pega todos os momentos cadastros;

  getMoment(id: number): Observable<IResponse<IMoment>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IResponse<IMoment>>(url)
  }//pega um momento especifico;

  createMoment(formData: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData)
  }//cria um momento no DB;

  removeMoment(id: number){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }//deletando dado do BD
}
