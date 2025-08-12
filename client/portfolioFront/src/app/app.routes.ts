import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Projects } from './pages/projects/projects';
import { Contact } from './pages/contact/contact';
import { UserLayout } from './layouts/user-layout/user-layout';
import { ExperinceInfo } from './dashboard/experince-info/experince-info';
import { ContactInfo } from './dashboard/contact-info/contact-info';
import { NotFound } from './pages/not-found/not-found';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';

export const routes: Routes = [
    {
    path: '',
    component: UserLayout, // Load the UserLayoutComponent for these routes
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'about', component: About },
      { path: 'projects', component: Projects },
      { path: 'services', component: Services },
      { path: 'contact', component: Contact }
      // ... add contact, services pages here
    ]},
    {
    path: 'dashboard',
    component: DashboardLayout, // Load the DashboardLayoutComponent for these routes
    // Now, we lazy-load the DashboardModule. Its routes will be children of DashboardLayoutComponent.
    loadChildren: () => import('./dashboard/dashboard-module').then(m => m.DashboardModule)
  },
      { path: '**', component: NotFound }

]
