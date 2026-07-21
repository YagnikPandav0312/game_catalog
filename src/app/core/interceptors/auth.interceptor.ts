import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from '../../authentication/login/login';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const modalService = inject(NgbModal);
  const token = authService.getToken();

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/login')) {
        authService.clearLocalSession();
        toastr.error('Session expired or unauthorized. Please log in again.');
        modalService.dismissAll();
        modalService.open(Login, { centered: true, backdrop: 'static' });
      }
      return throwError(() => error);
    })
  );
};
