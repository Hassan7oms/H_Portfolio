import { Component, OnInit } from '@angular/core';
import { Iskill, SkillService } from '../service/skillServices/skill.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills-info',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './skills-info.html',
  styleUrl: './skills-info.css'
})
export class SkillsInfo implements OnInit {
  myForm!: FormGroup;
  skills: Iskill[] = []; // Array to hold the list of existing skills
  isEditMode = false;   // Flag to track if we are adding or editing
  currentSkillId: string | null = null; // To store the ID of the skill being edited
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private skillsService: SkillService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSkills();
  }

  initializeForm(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      level: [75, [Validators.required, Validators.min(0), Validators.max(100)]],
      iconimgUrl: ['', Validators.required] // Renamed to match your interface
    });
    this.isEditMode = false;
    this.currentSkillId = null;
  }

  loadSkills(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.skillsService.getSkills().subscribe({
      next: (data) => {
        this.skills = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load skills.';
        this.isLoading = false;
      }
    });
  }

  editSkill(skill: Iskill): void {
    this.isEditMode = true;
    console.log('Editing skill:', skill._id);
    this.currentSkillId = (skill as any)._id; // Assuming the ID is _id from MongoDB
    this.myForm.patchValue(skill);
  }

  deleteSkill(skillId: any): void {
    if (confirm('Are you sure you want to delete this skill?')) {
      this.skillsService.deleteSkill(skillId).subscribe({
        next: () => this.loadSkills(),
        error: (err) => this.errorMessage = 'Failed to delete skill.'
      });
    }
  }

  submitForm(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const formData = this.myForm.value;

    if (this.isEditMode && this.currentSkillId) {
      console.log('Updating skill:', this.currentSkillId);
      console.log('Updated skill data:', formData);
      this.skillsService.updateSkill(this.currentSkillId, formData).subscribe({
        next: () => {
          this.loadSkills();
          this.resetForm();
        },
        error: (err) => this.errorMessage = 'Failed to update skill.'
      });
    } else {
      this.skillsService.addSkill(formData).subscribe({
        next: () => {
          this.loadSkills();
          this.resetForm();
        },
        error: (err) => this.errorMessage = 'Failed to add skill.'
      });
    }
  }

  resetForm(): void {
    this.myForm.reset({
        level: 75 // Reset slider to a default value
    });
    this.isEditMode = false;
    this.currentSkillId = null;
  }
}
