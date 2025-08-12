import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface IService {
  _id?: Object;
  title: string;
  description: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'http://localhost:3000/service';
  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get<IService[]>(this.apiUrl);
  }

  addService(service: IService) {
    return this.http.post<IService>(this.apiUrl, service);
  }
  deleteService(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateService(id: string, service: IService) {
    return this.http.put<IService>(`${this.apiUrl}/${id}`, service);
  }

}
