import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from '../login/login';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastrService);
  private readonly modalService = inject(NgbModal);
  private readonly elementRef = inject(ElementRef);
  
  public readonly showPassword = signal<boolean>(false);
  public readonly countries = signal<any[]>([]);
  public readonly dropdownOpen = signal<boolean>(false);

  get selectedCountry() {
    const value = this.registerForm.get('countryId')?.value;
    return this.countries().find(c => c.country_id === Number(value)) || null;
  }

  toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  selectCountry(country: any) {
    this.registerForm.patchValue({ countryId: country.country_id });
    this.dropdownOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen.set(false);
    }
  }

  readonly registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    countryId: ['', Validators.required],
    agreeTerms: [false, Validators.requiredTrue]
  });

  readonly submitted = signal(false);
  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.authService.getCountries().subscribe({
      next: (response) => {
        if (response && response.data) {
          this.countries.set(response.data);
        }
      },
      error: (err) => {
        console.error('Failed to load countries:', err);
      }
    });
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.registerForm.invalid) {
      return;
    }
    const { username, email, password, countryId } = this.registerForm.value;
    this.authService.register(username, email, password, Number(countryId)).subscribe({
      next: (response) => {
        if (response && response.status && response.status.code === 0) {
          this.toastService.success(response.status.message || 'Account created successfully! Please log in.');
          this.modalService.dismissAll();
          this.modalService.open(Login, { backdrop: 'static', centered: true });
        } else {
          console.log(response?.status?.message);
          this.toastService.error(response?.status?.message || 'Registration failed');
        }
      },
      error: (err) => {
        const errorMsg = err.error?.status?.message || 'Registration failed. Please try again.';
        this.toastService.error(errorMsg);
      }
    });
  }

  login() {
    this.modalService.dismissAll();
    this.modalService.open(Login, { backdrop: 'static', centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }
}

