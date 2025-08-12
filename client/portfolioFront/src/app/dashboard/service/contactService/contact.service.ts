import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Import Observable

// This is the shape of the data coming FROM the database
export interface IContact {
  _id: string; // MongoDB IDs are returned as strings in JSON
  socialMediaiconImg: string;
  socialMediaLink: string;
  name: string;
}

// This is the shape of the data you SEND TO the database for creation
// It's the same as IContact but without the _id, which the DB creates.
export type IContactCreate = Omit<IContact, '_id'>;

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/contact'; // Corrected from http//

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.apiUrl);
  }

  // Use the new IContactCreate type for adding
  addContact(contactData: IContactCreate): Observable<IContact> {
    return this.http.post<IContact>(this.apiUrl, contactData);
  }

  // --- CORRECTED UPDATE METHOD ---
  // It's cleaner to pass the ID and the data separately.
  updateContact(id: string, contactData: Partial<IContactCreate>): Observable<IContact> {
    return this.http.put<IContact>(`${this.apiUrl}/${id}`, contactData);
  }
  
  // --- CORRECTED DELETE METHOD ---
  // Ensure the ID is always treated as a string.
  deleteContact(id: string): Observable<object> { // The response is usually empty or a success message
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}