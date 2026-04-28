// src/app/auth/interceptors/auth-interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { TokenService } from '../services/token';
// ✅ import عادي - مش require() - الـ circular يتحل بـ injector.get() runtime
import { AuthService } from '../services/auth';
import { TokenRefreshResponse } from '../models/auth.models';

let isRefreshing = false;
const refreshDone$ = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // ✅ TokenService مفيهاش HttpClient - مفيش circular
  const tokenService = inject(TokenService);
  // ✅ Injector بيجيب AuthService lazily وقت الـ runtime بس
  const injector = inject(Injector);

  const addToken = (request: typeof req, token: string) =>
    request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  const token = tokenService.getAccessToken();
  const authReq = token ? addToken(req, token) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthEndpoint =
        req.url.includes('/auth/login') ||
        req.url.includes('/auth/token/refresh') ||
        req.url.includes('/auth/register');

      if (error.status !== 401 || isAuthEndpoint) {
        return throwError(() => error);
      }

      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        return throwError(() => error);
      }

      // ✅ هنا بس بنجيب AuthService لأنه اتبنى خلاص في الـ runtime
      const auth = injector.get(AuthService);

      if (!isRefreshing) {
        isRefreshing = true;
        refreshDone$.next(null);

        return auth.refreshAccessToken().pipe(
          switchMap((res: TokenRefreshResponse) => {
            isRefreshing = false;
            refreshDone$.next(res.access);
            return next(addToken(req, res.access));
          }),
          catchError((refreshError: HttpErrorResponse) => {
            isRefreshing = false;
            refreshDone$.next(null);
            console.error('[Interceptor] Token refresh failed:', refreshError);
            auth.logout();
            return throwError(() => refreshError);
          })
        );
      } else {
        return refreshDone$.pipe(
          filter((t): t is string => t !== null),
          take(1),
          switchMap((newToken) => next(addToken(req, newToken)))
        );
      }
    })
  );
};