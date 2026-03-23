import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth';

let isRefreshing = false;
const refreshDone$ = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const addToken = (request: typeof req, token: string) =>
  request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  const token = auth.getToken();
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

      // ─── Refresh lock logic ─────────────────────────────────────────
      if (!isRefreshing) {
        isRefreshing = true;
        refreshDone$.next(null);

        return auth.refreshAccessToken().pipe(
          switchMap((res) => {
            isRefreshing = false;
            refreshDone$.next(res.access);

            return next(addToken(req, res.access));
          }),
          catchError((refreshError) => {
            isRefreshing = false;
            refreshDone$.next(null);
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
