import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private readonly baseURL = environment.baseUrl;

  constructor(
    private _httpClient: HttpClient,
  ) { }

  /* Método para realizar una solicitud GET */
  get(endpoint: string): Observable<any> {
    const url = `${this.baseURL}/${endpoint}`
    console.log(url)
    return this._httpClient.get(url);
  }

  /* Método para realizar una solicitud POST */
  post(endpoint: string, data: any): Observable<any> {
    const url = `${this.baseURL}/${endpoint}`
    return this._httpClient.post(url, data);
  }

  /* Método para realizar una solicitud PUT */
  put(endpoint: string, data: any): Observable<any> {
    const url = `${this.baseURL}/${endpoint}`
    return this._httpClient.put(url, data);
  }

  /* Método para realizar una solicitud DELETE */
  delete(endpoint: string): Observable<any> {
    const url = `${this.baseURL}/${endpoint}`;
    return this._httpClient.delete(url);
  }

}
