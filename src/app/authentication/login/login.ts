import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Register } from '../register/register';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastrService);
  private readonly modalService = inject(NgbModal);
  public readonly showPassword = signal<boolean>(false);
  public router = inject(Router);
  readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  readonly submitted = signal(false);

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        if (response && response.status.code === 0) {
          this.toastService.success(response.status.message);
          this.modalService.dismissAll();
          this.router.navigate(['/home/casino']);
        } else {
          this.toastService.error(response?.status?.message || 'Invalid Credentials');
        }
      },
      error: (err) => {
        const errorMsg = err.error?.status?.message || 'Login failed. Please try again.';
        this.toastService.error(errorMsg);
      }
    });
  }

  register() {
    this.modalService.dismissAll();
    this.modalService.open(Register, { backdrop: 'static', centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }
}
