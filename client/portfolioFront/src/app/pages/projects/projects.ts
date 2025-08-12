import { Component, OnInit } from '@angular/core';
import { IProjects, ProjectsService } from '../../dashboard/service/projectsService/projects.service';
import { PersonalInfService } from '../../dashboard/service/personalInfService/personal-inf.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit { // Implement OnInit

  // Properties for data
  allProjects: IProjects[] = []; // This will hold the master list of all projects
  filteredProjects: IProjects[] = []; // This will hold the projects to be displayed
  pageSubtitle = 'Explore my digital creations and innovations'; // Default value
  
  // Properties for state management
  isLoading = true;
  errorMessage: string | null = null;
  
  // Properties for filtering
  categories: string[] = [];
  activeFilter = 'All';

  // Inject the required services
  constructor(
    private projectsService: ProjectsService,
    private personalInfoService: PersonalInfService 
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadSubtitle();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.allProjects = data;
        this.filteredProjects = data; // Initially, show all projects
        // Dynamically create the list of categories from the project data
        this.categories = ['All', ...new Set(data.map(p => p.category))];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load projects.';
        this.isLoading = false;
        console.error('Error fetching projects:', err);
      }
    });
  }

  // This method will be called when a filter button is clicked
  filterProjects(category: string): void {
    this.activeFilter = category;
    if (category === 'All') {
      this.filteredProjects = this.allProjects;
    } else {
      this.filteredProjects = this.allProjects.filter(p => p.category === category);
    }
  }

  // Optional: Load the subtitle from the Personal Info data
  loadSubtitle(): void {
    this.personalInfoService.getPersonalInfo().subscribe({
      next: (data) => {
        const info = Array.isArray(data) && data.length > 0 ? data[0] : data;
        // Assuming you add a 'projectsSubtitle' field to your Personal Info form/model
        if ((info as any).projectsSubtitle) {
          this.pageSubtitle = (info as any).projectsSubtitle;
        }
      }
    });
  }
}
