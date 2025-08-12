import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPersonalInfo, PersonalInfService } from '../service/personalInfService/personal-inf.service';
@Component({
  selector: 'app-personal-info',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css'
})
export class PersonalInfo implements OnInit {
  myForm!: FormGroup;
  apiData!: object;
  constructor(private personalInfoService: PersonalInfService) { }
   ngOnInit(): void {
  

    this.myForm = new FormGroup({
        name: new FormControl('',[Validators.required,Validators.minLength(3)]),
        title: new FormControl('',Validators.required),
        greeting: new FormControl('',Validators.required),
        heroDescription: new FormControl('',Validators.required),
        aboutSubtitle: new FormControl('',Validators.required),
        aboutStory: new FormControl('',Validators.required),
        WhatIDo:  new FormControl('',Validators.required),
        myApproach : new FormControl('',Validators.required),
        yearsExperience: new FormControl('',Validators.required),
        projectsCompleted : new FormControl('',Validators.required),
        happyClients: new FormControl('',Validators.required),
      
  })
 this.getPersonalInfo();
}
getPersonalInfo() {
  this.personalInfoService.getPersonalInfo().subscribe({
    next: (data) => {
      const info = Array.isArray(data) && data.length > 0 ? data[0] : {};
      this.apiData = {
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
      console.log('apidata:', this.apiData);
      this.myForm.patchValue(this.apiData);
      console.log('Form values updated:', this.myForm.value);
    },
    error: (error) => {
      console.error('Error fetching personal info:', error);
    }
  });
}

updatePersonalInfo() {
  if (this.myForm.valid) {
    this.personalInfoService.updatePersonalInfo(this.myForm.value).subscribe({
      next: (response) => {
        console.log('Personal info updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating personal info:', error);
      }
    });
  } else {
    console.error('Form is invalid');
  }
}


submitForm() {
    this.updatePersonalInfo();
  }

}
