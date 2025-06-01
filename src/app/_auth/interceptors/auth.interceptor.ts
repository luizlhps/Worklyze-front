import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { customExceptionHandler } from '../../shared/utils/custom-exception-handler';
import { AuthExceptionCode } from '../exceptions/auth-exception-code';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (req.url.includes('/auth/refresh')) {
    return next(req);
  }

  let accessToken = authService.getRefreshToken();

  if (accessToken) {
    req = addToken(req, accessToken);
  }

  return next(req).pipe(
    catchError((error) => {
      const customException = customExceptionHandler(error);

      if (error.status === 401 && customException?.error_code !== AuthExceptionCode.USUARIO_EMAIL_SENHA_INVALIDO) {
        return handle401Error(req, next, authService);
      }

      console.error('Erro HTTP:', error);
      return throwError(() => error);
    })
  );
};

function addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handle401Error(req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> {
  return authService.refreshToken().pipe(
    switchMap((newAccessToken) => {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
      return next(clonedReq);
    }),
    catchError((err) => {
      return throwError(() => err);
    })
  );
}
