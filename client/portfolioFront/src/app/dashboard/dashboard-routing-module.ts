import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInfo } from './personal-info/personal-info';
import { DashboardMain } from './dashboard-main/dashboard-main';
import { ProjectsInfo } from './projects-info/projects-info';
import { ServicesInfo } from './services-info/services-info';
import { SkillsInfo } from './skills-info/skills-info';
import { ExperinceInfo } from './experince-info/experince-info';
import { ContactInfo } from './contact-info/contact-info';

const routes: Routes = [

  {
    path: '',
    component: DashboardMain, 
    children: [
      { path: '', redirectTo: 'personal-info', pathMatch: 'full' },

 
      { path: 'personal-info', component: PersonalInfo },
      { path: 'projects', component: ProjectsInfo },     
      { path: 'services', component: ServicesInfo },     
      { path: 'skills', component:SkillsInfo },         
      { path: 'experience', component: ExperinceInfo }, 
      { path: 'contact', component: ContactInfo },         
    ]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
