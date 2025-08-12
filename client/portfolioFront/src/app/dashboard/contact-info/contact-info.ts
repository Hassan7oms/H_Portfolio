import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService, IContact, IContactCreate } from '../service/contactService/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-info',
  standalone: true, // Mark as standalone
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-info.html',
  styleUrls: ['./contact-info.css']
})
export class ContactInfo implements OnInit {
  myForm!: FormGroup;
  contacts: IContact[] = [];
  isEditMode = false;
  currentContactId: string | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadContacts();
  }

  initializeForm(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      socialMediaLink: ['', [Validators.required, Validators.pattern('https?://.+')]],
      socialMediaiconImg: ['', Validators.required]
    });
    this.isEditMode = false;
    this.currentContactId = null;
  }

  loadContacts(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load contact links.';
        this.isLoading = false;
      }
    });
  }

  editContact(contact: IContact): void {
    this.isEditMode = true;
    this.currentContactId = contact._id; // The ID is always a string from the DB
    this.myForm.patchValue(contact);
  }

  // --- CORRECTED DELETE CALL ---
  deleteContact(contactId: string): void {
    if (confirm('Are you sure you want to delete this social link?')) {
      this.contactService.deleteContact(contactId).subscribe({
        next: () => this.loadContacts(),
        error: () => this.errorMessage = 'Failed to delete link.'
      });
    }
  }

  submitForm(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const formData: IContactCreate = this.myForm.value;

    if (this.isEditMode && this.currentContactId) {
      // --- CORRECTED UPDATE CALL ---
      // Pass the ID and the form data as separate arguments.
      this.contactService.updateContact(this.currentContactId, formData).subscribe({
        next: () => {
          this.loadContacts();
          this.resetForm();
        },
        error: () => this.errorMessage = 'Failed to update link.'
      });
    } else {
      // Add call remains the same, but now uses the correct type.
      this.contactService.addContact(formData).subscribe({
        next: () => {
          this.loadContacts();
          this.resetForm();
        },
        error: () => this.errorMessage = 'Failed to add link.'
      });
    }
  }

  resetForm(): void {
    this.myForm.reset();
    this.isEditMode = false;
    this.currentContactId = null;
  }
}