import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExperinceService, IExperience } from '../service/experinceService/experince.service';

@Component({
  selector: 'app-experince-info',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './experince-info.html',
  styleUrl: './experince-info.css'
})
export class ExperinceInfo implements OnInit {
  myForm!: FormGroup;
  experiences: IExperience[] = []; // Array to hold the list of existing experiences
  isEditMode = false;             // Flag to track if we are adding or editing
  currentExperienceId: string | null = null; // To store the ID of the experience being edited
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperinceService 
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadExperiences();
  }

  initializeForm(): void {
    this.myForm = this.fb.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''], // End date can be optional (for current jobs)
      responsibilities: ['', Validators.required]
    });
    this.isEditMode = false;
    this.currentExperienceId = null;
  }

  loadExperiences(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.experienceService.getExperiences().subscribe({
      next: (data) => {
        this.experiences = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load experiences.';
        this.isLoading = false;
      }
    });
  }

  editExperience(experience: IExperience): void {
    this.isEditMode = true;
    this.currentExperienceId = (experience as any)._id; // Assuming _id from MongoDB

    // Format dates for the date input field, which expects 'YYYY-MM-DD'
    const formattedExperience = {
      ...experience,
      startDate: this.formatDateForInput(experience.startDate),
      endDate: this.formatDateForInput(experience.endDate)
    };
    this.myForm.patchValue(formattedExperience);
  }

  deleteExperience(experienceId: any): void {
    if (confirm('Are you sure you want to delete this experience entry?')) {
      this.experienceService.deleteExperience(experienceId).subscribe({
        next: () => this.loadExperiences(),
        error: (err) => this.errorMessage = 'Failed to delete experience.'
      });
    }
  }

  submitForm(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const formData = this.myForm.value;

    if (this.isEditMode && this.currentExperienceId) {
      this.experienceService.updateExperience(this.currentExperienceId, formData).subscribe({
        next: () => {
          this.loadExperiences();
          this.resetForm();
        },
        error: (err) => this.errorMessage = 'Failed to update experience.'
      });
    } else {
      this.experienceService.addExperience(formData).subscribe({
        next: () => {
          this.loadExperiences();
          this.resetForm();
        },
        error: (err) => this.errorMessage = 'Failed to add experience.'
      });
    }
  }

  resetForm(): void {
    this.myForm.reset();
    this.isEditMode = false;
    this.currentExperienceId = null;
  }
  
  // Helper function to format date objects into YYYY-MM-DD strings
  private formatDateForInput(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
