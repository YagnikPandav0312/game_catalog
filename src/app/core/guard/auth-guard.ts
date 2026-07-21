import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from '../../authentication/login/login';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const modalService = inject(NgbModal);

  if (authService.isLoggedIn() && authService.getToken()) {
    return true;
  }

  toastr.warning('Please log in to access this page.');
  modalService.dismissAll();
  modalService.open(Login, { centered: true, backdrop: 'static' });
  return false;
};
