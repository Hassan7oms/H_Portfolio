import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService, IProjects } from '../service/projectsService/projects.service';


export interface Project {
  _id: string;
  title: string;
  description: string;
  imgsUrl: string;
  category: string;
  technologies: string[];
  liveDemoUrl: string;
  githubUrl: string;
}

@Component({
  selector: 'app-projects-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects-info.html',
  styleUrls: ['./projects-info.css']
})
export class ProjectsInfo implements OnInit {
  myForm!: FormGroup;
  projects: IProjects[] = []; 
  isEditMode = false; 
  currentProjectId: string | null = null; 
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService 
  ) {}

  ngOnInit(): void {

    this.initializeForm();
    this.loadProjects();
  }

  
  initializeForm(): void {
    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      imgsUrl: [''],
      category: ['Web Development', Validators.required],
      technologies: this.fb.array([this.fb.control('')]),
      liveDemoUrl: [''],
      githubUrl: ['']
    });
    this.isEditMode = false;
    this.currentProjectId = null;
  }

  loadProjects(): void {
    this.isLoading = true;
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // --- FormArray Getters and Methods ---
  get technologies() {
    return this.myForm.get('technologies') as FormArray;
  }
  addTechnology() {
    this.technologies.push(this.fb.control(''));
  }
  removeTechnology(index: number) {
    this.technologies.removeAt(index);
  }

  // --- CRUD Actions ---

  // Called when the 'Edit' button is clicked for a project
  editProject(project: Project): void {
    this.isEditMode = true;
    this.currentProjectId = project._id;

    // Use patchValue to fill the form with the project's data
    this.myForm.patchValue(project);

    // Clear and re-populate the technologies FormArray
    this.technologies.clear();
    project.technologies.forEach(tech => this.technologies.push(this.fb.control(tech)));
  }

  // Called when the 'Delete' button is clicked
  deleteProject(projectId: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectsService.deleteProject(projectId).subscribe({
        next: () => {
          this.loadProjects(); // Refresh the list after deleting
        },
        error: (err) => console.error(err)
      });
    }
  }

  // Called when the main form is submitted
  submitForm(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    let formData: IProjects | Omit<IProjects, '_id'>;
    if (this.isEditMode && this.currentProjectId) {
      // --- UPDATE LOGIC ---
      formData = {
        _id: this.currentProjectId,
        ...this.myForm.value
      };
      this.projectsService.updateProject(formData as IProjects).subscribe({
        next: () => {
          this.loadProjects();
          this.resetForm();
        },
        error: (err) => console.error(err)
      });
    } else {
      // --- CREATE LOGIC ---
      // Remove _id from the request body
      console.log('Project added successfully');
      const { _id, ...projectData } = this.myForm.value;
      this.projectsService.addProject(projectData).subscribe({
        next: () => {
          
          this.loadProjects();
          this.resetForm();
        },
        error: (err) => console.error(err)
      });
    }
  }

  // A method to clear the form and switch back to "Add Mode"
  resetForm(): void {
    this.myForm.reset();
    this.technologies.clear();
    this.addTechnology(); // Add one empty field back
    this.isEditMode = false;
    this.currentProjectId = null;
    
    // Reset the category to the default value
    this.myForm.get('category')?.setValue('Web Development');
  }

  // addProject method is now handled in submitForm for create
}