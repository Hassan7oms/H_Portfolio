import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Iskill{
  _id: string;
  name:string,
  level:number,
  iconimgUrl:string
}
@Injectable({
  providedIn: 'root'
})
export class SkillService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/skill';
  getSkills() {
    return this.http.get<Iskill[]>(this.apiUrl);
  }
  addSkill(skill: Iskill) {
    return this.http.post<Iskill>(this.apiUrl, skill);
  }
  deleteSkill(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateSkill(id: string, skill: Iskill) {
    return this.http.put<Iskill>(`${this.apiUrl}/${id}`, skill);
  }
}
