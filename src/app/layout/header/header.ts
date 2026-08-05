import { Component, inject, output, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from '../../authentication/login/login';
import { Register } from '../../authentication/register/register';
import { AuthService } from '../../core/services/auth';
import { ToastrService } from 'ngx-toastr';
import { Confirm } from '../../shared/components/confirm/confirm';
import { socket } from '../../core/services/socket';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() sidebarOpen: boolean = false;
  public toggleSidebar = output<void>();
  public modalService = inject(NgbModal);
  public authService = inject(AuthService);
  private toastr = inject(ToastrService);
  public modelService = inject(NgbModal);
  public router = inject(Router);
  public readonly socketService = inject(socket);

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
            this.socketService.disconnect();
            this.router.navigate(['']);
            this.toastr.success(data.status.message);
          },
          error: (err) => {
            localStorage.clear();
            this.socketService.disconnect();
            this.router.navigate(['']);
            this.toastr.error(err.status.message);
          }
        });
      }
      modalRef.close();
    });
  }
}
