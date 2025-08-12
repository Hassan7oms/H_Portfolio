import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
export interface IExperience {
  _id?: string;
  startDate: Date;
  endDate: Date;
  jobTitle: string;
  responsibilities: string;
  companyName: string;
}
@Injectable({
  providedIn: 'root'
})
export class ExperinceService {
  private apiUrl = 'http://localhost:3000/experience';

  constructor(private http: HttpClient) { }

  getExperiences(): Observable<IExperience[]> {
    return this.http.get<IExperience[]>(this.apiUrl);
  }

  addExperience(experience: IExperience): Observable<IExperience> {
    return this.http.post<IExperience>(this.apiUrl, experience);
  }

  updateExperience(id: string, experience: IExperience): Observable<IExperience> {
    return this.http.put<IExperience>(`${this.apiUrl}/${id}`, experience);
  }

  deleteExperience(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
