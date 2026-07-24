import { Component, inject, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from '../../authentication/login/login';
import { Register } from '../../authentication/register/register';
import { AuthService } from '../../core/services/auth';
import { ToastrService } from 'ngx-toastr';
import { Confirm } from '../../shared/components/confirm/confirm';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public toggleSidebar = output<void>();
  public modalService = inject(NgbModal);
  public authService = inject(AuthService);
  private toastr = inject(ToastrService);
  public modelService = inject(NgbModal);
  public router = inject(Router);

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  onLogin() {
    this.modalService.open(Login, {
      centered: true,
      backdrop: 'static',
      size: 'md',
    });
  }

  onRegister() {
    this.modalService.open(Register, {
      centered: true,
      backdrop: 'static',
      size: 'md',
    });
  }

  Logout() {
    const modalRef = this.modelService.open(Confirm, {
      centered: true,
      backdrop: 'static',
      size: 'md',
    });
    modalRef.componentInstance.title = 'Logout';
    modalRef.componentInstance.message = 'Are you sure you want to logout ?';
    modalRef.componentInstance.onClose.subscribe((returnData: any) => {
      if (returnData) {
        this.authService.logout().subscribe({
          next: (data) => {
            localStorage.clear();
            this.router.navigate(['']);
            this.toastr.success(data.status.message);
          },
          error: (err) => {
            localStorage.clear();
            this.toastr.error(err.status.message);
          }
        });
      }
      modalRef.close();
    });
  }
}
