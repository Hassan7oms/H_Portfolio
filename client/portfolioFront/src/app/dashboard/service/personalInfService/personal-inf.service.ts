import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
export interface IPersonalInfo {
  _id: string;
  identifier: string;
  name: string;
  title: string;
  greeting: string;
  heroDescription: string;
  aboutSubtitle: string;
  aboutStory: string;
  WhatIDo: string;
  myApproach: string;
  yearsExperience: string;
  projectsCompleted: string;
  happyClients: string;
}
@Injectable({
  providedIn: 'root'
})
export class PersonalInfService {
  private apiUrl = 'http://localhost:3000/personal';

  
  constructor(private http: HttpClient) { }


  getPersonalInfo(): Observable<IPersonalInfo> {
    return this.http.get<IPersonalInfo>(this.apiUrl).pipe(
      catchError(this.handleError) // Pass any errors to our handler
    );
  }

  
  updatePersonalInfo(data: IPersonalInfo): Observable<IPersonalInfo> {
    
    return this.http.put<IPersonalInfo>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  
  private handleError(error: any) {
    console.error('An API error occurred:', error);
    
    return throwError(() => new Error('A data communication error occurred. Please try again later.'));
  }
}
