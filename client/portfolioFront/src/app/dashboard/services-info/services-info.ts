import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IService, ServicesService } from '../service/Services/services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-info',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './services-info.html',
  styleUrl: './services-info.css'
})
export class ServicesInfo implements OnInit {
  myForm!: FormGroup;
  services: IService[] = []; // Array to hold the list of existing services
  isEditMode = false;      // Flag to track if we are adding or editing
  currentServiceId: string | null = null; // To store the ID of the service being edited
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    // Initialize the form using FormBuilder for a cleaner syntax
    this.myForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', Validators.required],
        icon: ['', Validators.required] // e.g., 'fas fa-code' for Font Awesome
    });
    this.loadServices();
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
      }
    });
  }

  // Called when the 'Edit' button is clicked for a service
  editService(service: IService): void {
    this.isEditMode = true;
    this.currentServiceId = service._id as string;
    this.myForm.patchValue(service); // Fill the form with the service's data
  }

  // Called when the 'Delete' button is clicked
  deleteService(serviceId: any): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.servicesService.deleteService(serviceId).subscribe({
        next: () => this.loadServices(), // Refresh the list after deleting
        error: (err) => this.errorMessage = 'Failed to delete service.'
      });
    }
  }

  // Called when the main form is submitted
  submitForm(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const formData = this.myForm.value;

    if (this.isEditMode && this.currentServiceId) {
      // --- UPDATE LOGIC ---
      this.servicesService.updateService(this.currentServiceId, formData).subscribe({
        next: () => {
          this.loadServices();
          this.resetForm();
        },
        error: (err) => this.errorMessage = 'Failed to update service.'
      });
    } else {
      // --- CREATE LOGIC ---
      this.servicesService.addService(formData).subscribe({
        next: () => {
          this.loadServices();
          this.resetForm();
        },
        error: (err) => this.errorMessage = 'Failed to add service.'
      });
    }
  }

  // A method to clear the form and switch back to "Add Mode"
  resetForm(): void {
    this.myForm.reset();
    this.isEditMode = false;
    this.currentServiceId = null;
  }
}
