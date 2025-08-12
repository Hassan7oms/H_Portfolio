import { Component, OnInit } from '@angular/core';
import { ContactService, IContact } from '../../dashboard/service/contactService/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit { // Implement the OnInit lifecycle hook

  // Properties to hold your dynamic data
  socialLinks: IContact[] = [];

  // Properties for a better user experience
  isLoading = true;
  errorMessage: string | null = null;

  // Inject the ContactService into the component
  constructor(private contactService: ContactService) {}

  // The ngOnInit method is called automatically when the component is initialized
  ngOnInit(): void {
    this.loadSocialLinks();
  }

  loadSocialLinks(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.socialLinks = data;
        this.isLoading = false;
        console.log('Social links loaded:', this.socialLinks);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load social links. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching social links:', err);
      }
    });
  }
}
