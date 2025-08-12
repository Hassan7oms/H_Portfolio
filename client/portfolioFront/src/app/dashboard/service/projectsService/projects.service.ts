import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
export interface IProjects {
  _id: string;
  title: string;
  description: string;
  imgsUrl: string;
  category: string;
  technologies: string[];
  liveDemoUrl: string;
  githubUrl: string;
  
}
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
    private apiUrl = 'http://localhost:3000/project';

  
  constructor(private http: HttpClient) { }


  getProjects(): Observable<IProjects[]> {
    return this.http.get<IProjects[]>(this.apiUrl).pipe(
      catchError(this.handleError) // Pass any errors to our handler
    );
  }

  addProject(data: Omit<IProjects, '_id'>): Observable<IProjects> {
    return this.http.post<IProjects>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  updateProject(data: IProjects): Observable<IProjects> {

    return this.http.put<IProjects>(`${this.apiUrl}/${data._id}`, data).pipe(
      catchError(this.handleError)
    );
  }
  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  } 

  
  private handleError(error: any) {
    console.error('An API error occurred:', error);
    
    return throwError(() => new Error('A data communication error occurred. Please try again later.'));
  }
}
