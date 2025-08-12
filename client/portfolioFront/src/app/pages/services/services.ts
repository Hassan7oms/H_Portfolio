import { Component, OnInit } from '@angular/core';
import { IService, ServicesService } from '../../dashboard/service/Services/services.service';
import { PersonalInfService } from '../../dashboard/service/personalInfService/personal-inf.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit { // Implement OnInit

  // Properties to hold your dynamic data
  services: IService[] = [];
  pageSubtitle = 'Transforming ideas into digital reality'; // Default value

  // Loading and error states for better UX
  isLoading = true;
  errorMessage: string | null = null;

  // Inject both services
  constructor(
    private servicesService: ServicesService,
    private personalInfoService: PersonalInfService
  ) {}

  ngOnInit(): void {
    // Fetch both sets of data when the component loads
    this.loadServices();
    this.loadSubtitle();
  }

  loadServices(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load services.';
        this.isLoading = false;
        console.error('Error fetching services:', err);
      }
    });
  }
  
  // Optional: Load the subtitle from the Personal Info data
  loadSubtitle(): void {
    this.personalInfoService.getPersonalInfo().subscribe({
        next: (data) => {
            const info = Array.isArray(data) && data.length > 0 ? data[0] : data;
            // Assuming you add a 'servicesSubtitle' field to your Personal Info form/model
            if ((info as any).servicesSubtitle) {
                this.pageSubtitle = (info as any).servicesSubtitle;
            }
        }
        // No need for error handling here, as we have a default value
    });
  }
}
