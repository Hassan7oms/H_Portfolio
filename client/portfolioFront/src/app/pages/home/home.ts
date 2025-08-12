import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IPersonalInfo, PersonalInfService } from '../../dashboard/service/personalInfService/personal-inf.service';
import { IProjects, ProjectsService } from '../../dashboard/service/projectsService/projects.service';
import { Iskill, SkillService } from '../../dashboard/service/skillServices/skill.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  
  // Properties to hold the data for each section
  dataobject: Partial<IPersonalInfo> = {};
  featuredProjects: IProjects[] = [];
  skills: Iskill[] = [];

  // Properties for loading and error states
  isLoadingProjects = true;
  isLoadingSkills = true;
  errorMessage: string | null = null;

  // Inject all three services
  constructor(
    private personalInfoService: PersonalInfService,
    private projectsService: ProjectsService,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    // Call all data-fetching methods when the component loads
    this.getPersonalInfo();
    this.getFeaturedProjects();
    this.getSkills();
  }

  getPersonalInfo(): void {
    this.personalInfoService.getPersonalInfo().subscribe({
      next: (data) => {
        // This logic correctly handles both an array or a single object response
        const info = Array.isArray(data) && data.length > 0 ? data[0] : data as IPersonalInfo;
        this.dataobject = info;
      },
      error: (error) => {
        console.error('Error fetching personal info:', error);
        this.errorMessage = 'Could not load page content.';
      }
    });
  }

  getFeaturedProjects(): void {
    this.isLoadingProjects = true;
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        // For "Featured", let's just take the first 3 projects
        this.featuredProjects = data.slice(0, 3);
        this.isLoadingProjects = false;
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
        this.isLoadingProjects = false;
      }
    });
  }

  getSkills(): void {
    this.isLoadingSkills = true;
    this.skillService.getSkills().subscribe({
      next: (data) => {
        this.skills = data;
        this.isLoadingSkills = false;
      },
      error: (error) => {
        console.error('Error fetching skills:', error);
        this.isLoadingSkills = false;
      }
    });
  }
}