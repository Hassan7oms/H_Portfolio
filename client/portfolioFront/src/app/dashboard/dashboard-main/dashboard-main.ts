import { Component } from '@angular/core';
import { ExperinceInfo } from '../experince-info/experince-info';
import { PersonalInfo } from '../personal-info/personal-info';
import { ProjectsInfo } from '../projects-info/projects-info';
import { ServicesInfo } from '../services-info/services-info';
import { SkillsInfo } from '../skills-info/skills-info';
import { CommonModule } from '@angular/common';
import { ContactInfo } from '../contact-info/contact-info';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-main',
  imports: [ExperinceInfo,PersonalInfo,ProjectsInfo,ServicesInfo,SkillsInfo,ContactInfo,CommonModule,RouterLink],
  templateUrl: './dashboard-main.html',
  styleUrl: './dashboard-main.css'
})
export class DashboardMain {
  activeTab : String = 'personal';
  selectTab(tabName:String):void {
    this.activeTab = tabName;
  }
}
