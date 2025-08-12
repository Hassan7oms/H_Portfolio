import { Component, OnInit } from '@angular/core';
import { IPersonalInfo, PersonalInfService } from '../../dashboard/service/personalInfService/personal-inf.service';
import { Iskill, SkillService } from '../../dashboard/service/skillServices/skill.service';
import { ExperinceService, IExperience } from '../../dashboard/service/experinceService/experince.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit { // Implement OnInit
  
  // Properties for each data type
  dataobject: Partial<IPersonalInfo> = {};
  skills: Iskill[] = [];
  experiences: IExperience[] = [];
  
  // Loading and error states for better UX
  isLoadingSkills = true;
  isLoadingExperience = true;

  constructor(
    private personalInfoService: PersonalInfService,
    private skillService: SkillService,
    private experienceService: ExperinceService
  ) { }

  ngOnInit(): void {
    // Fetch all necessary data when the component loads
    this.getPersonalInfo();
    this.getSkills();
    this.getExperience();
  }

  getPersonalInfo(): void {
    this.personalInfoService.getPersonalInfo().subscribe({
      next: (data) => {
        const info = Array.isArray(data) && data.length > 0 ? data[0] : data as IPersonalInfo;
        this.dataobject = info;
      },
      error: (error) => console.error('Error fetching personal info:', error)
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

  getExperience(): void {
    this.isLoadingExperience = true;
    this.experienceService.getExperiences().subscribe({
      next: (data) => {
        // Sort experiences by start date, newest first
        this.experiences = data.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        this.isLoadingExperience = false;
      },
      error: (error) => {
        console.error('Error fetching experience:', error);
        this.isLoadingExperience = false;
      }
    });
  }

  // (Optional but recommended) A helper to group skills by category
  get skillsByCategory() {
    return this.skills.reduce((acc, skill) => {
      const category = (skill as any).category || 'General'; // Use 'General' if category is missing
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {} as { [key: string]: Iskill[] });
  }

  // (Optional but recommended) Helper to get keys from the grouped object for looping in HTML
  get skillCategories() {
    return Object.keys(this.skillsByCategory);
  }
}