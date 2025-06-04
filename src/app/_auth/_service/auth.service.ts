import { TokenAuth } from './../_dto/token-auth';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, finalize, map, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../_dto/auth-response';
import { jwtDecode } from 'jwt-decode';
import { AuthRequest } from '../_dto/auth-request';
import { AuthRegister } from '../_dto/auth-register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private httpClient = inject(HttpClient);

  private tokenAuth = new BehaviorSubject<TokenAuth | null>(null);
  private isRefreshingToken = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  login(dto: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.baseUrl}v1/auth/login`, dto).pipe(
      tap((value) => {
        this.setTokenAuth(value.token);
        this.autoPopulateToken();
      })
    );
  }

  register(dto: AuthRegister): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.baseUrl}v1/auth/register`, dto).pipe(
      tap((value) => {
        this.setTokenAuth(value.token);
        this.autoPopulateToken();
      })
    );
  }

  logout(redirect: string): void {
    localStorage.clear();

    window.location.href = redirect;
  }

  isAuth(): Observable<Boolean> {
    return this.tokenAuth.asObservable().pipe(map((authtoken) => authtoken !== null));
  }

  getTokenAuth(): Observable<TokenAuth | null> {
    return this.tokenAuth.asObservable();
  }

  getRefreshToken() {
    return this.refreshTokenSubject.value;
  }

  autoPopulateToken() {
    const token = localStorage.getItem('token');

    if (token) {
      const tokenAuth = this.decodeJwt(token);

      this.tokenAuth.next(tokenAuth);
    }
  }

  refreshToken(): Observable<string> {
    if (this.isRefreshingToken) {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1)
      );
    }

    this.isRefreshingToken = true;
    this.refreshTokenSubject.next(null);

    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      this.isRefreshingToken = false;
      return throwError(() => new Error('Refresh token não encontrado'));
    }

    return this.httpClient.post<AuthResponse>(`${this.baseUrl}/auth/refresh`, { refreshToken }).pipe(
      map((authResponse) => {
        this.setTokenAuth(authResponse.token);
        this.refreshTokenSubject.next(authResponse.refreshToken);

        return authResponse.refreshToken;
      }),
      catchError((err) => {
        this.logout('/login');
        return throwError(() => err);
      }),
      finalize(() => {
        this.isRefreshingToken = false;
      })
    );
  }

  setTokenAuth(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));

    if (token) {
      const tokenAuth = this.decodeJwt(token);

      this.tokenAuth.next(tokenAuth);
    }
  }

  private decodeJwt(token: string): TokenAuth {
    const decodedToken = jwtDecode(token) as TokenAuth;

    console.log(decodedToken);

    return decodedToken;
  }
}
