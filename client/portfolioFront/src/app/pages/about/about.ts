import { Component } from '@angular/core';
import { PersonalInfService } from '../../dashboard/service/personalInfService/personal-inf.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  constructor(private personalInfoService: PersonalInfService) { }
  dataobject = {
    name: '',
    title: '',
    greeting: '',
    heroDescription: '',
    aboutSubtitle: '',
    aboutStory: '',
    WhatIDo: '',
    myApproach: '',
    yearsExperience: 0,
    projectsCompleted: 0,
    happyClients: 0
  };

  ngOnInit(): void {
    this.getPersonalInfo();
  }

  getPersonalInfo() {
    this.personalInfoService.getPersonalInfo().subscribe({
      next: (data) => {
        
        const info = Array.isArray(data) && data.length > 0 ? data[0] : {};
      this.dataobject = {
        name: info.name,
        title: info.title,
        greeting: info.greeting,
        heroDescription: info.heroDescription,
        aboutSubtitle: info.aboutSubtitle,
        aboutStory: info.aboutStory,
        WhatIDo: info.WhatIDo,
        myApproach: info.myApproach,
        yearsExperience: info.yearsExperience,
        projectsCompleted: info.projectsCompleted,
        happyClients: info.happyClients
      };
      console.log('apidata:', this.dataobject);
      
      },
      error: (error) => {
        console.error('Error fetching personal info:', error);
      }
    });
  }
}
