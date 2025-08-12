import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PersonalInfService, IPersonalInfo } from '../../dashboard/service/personalInfService/personal-inf.service'; // Assuming IPersonalInfo is exported
import { ContactService, IContact } from '../../dashboard/service/contactService/contact.service'; // Import IContact

@Component({
  selector: 'app-footer',
  standalone: true, // Mark component as standalone
  imports: [RouterLink, CommonModule], // Add CommonModule to imports
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements OnInit { // Implement OnInit
  // It's good practice to strongly type your properties
  contactInfo: IContact[] = [];
  // Use a partial type for dataobject since it might not be fully loaded initially
  dataobject: Partial<IPersonalInfo> = {};
  isLoading = true; // Add a loading state

  constructor(
    private personalInfoService: PersonalInfService, 
    private contactInfoService: ContactService
  ) { }

  ngOnInit(): void {
    // Fetch both sets of data when the component initializes
    this.getPersonalInfo();
    this.getContactInfo(); // <-- CRITICAL: Call this method
  }
  
  getContactInfo(): void {
    this.contactInfoService.getContacts().subscribe({
      next: (data) => {
        this.contactInfo = data;
        console.log('Contact info loaded for footer:', this.contactInfo);
      },
      error: (error) => {
        console.error('Error fetching contact info:', error);
      }
    });
  }

  getPersonalInfo(): void {
    this.isLoading = true;
    this.personalInfoService.getPersonalInfo().subscribe({
      next: (data) => {
        // Assuming the API returns an array with one object
        if (Array.isArray(data) && data.length > 0) {
          this.dataobject = data[0];
        } else {
            // Handle cases where the API might return a single object directly
            this.dataobject = data as IPersonalInfo;
        }
        this.isLoading = false;
        console.log('Personal info loaded for footer:', this.dataobject);
      },
      error: (error) => {
        console.error('Error fetching personal info:', error);
        this.isLoading = false;
      }
    });
  }
}