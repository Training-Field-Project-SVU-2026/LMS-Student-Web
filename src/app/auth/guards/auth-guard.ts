import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // ✅ لو عمل login للتو، isLoggedIn = true → ادخل على طول
  // بدون ما ننتظر authReady$ اللي عنده null محفوظ من الـ boot
  if (auth.isLoggedIn()) return true;

  // ✅ بس لو refresh → ننتظر الـ boot يخلص الأول
  return auth.authReady$.pipe(
    take(1),
    map((user) => {
      if (user) return true;
      localStorage.setItem('redirectUrl', window.location.pathname);
      router.navigate(['/auth/login']);
      return false;
    })
  );
};

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    router.navigate(['/user-dashboard']);
    return false;
  }

  return auth.authReady$.pipe(
    take(1),
    map((user) => {
      if (!user) return true;
      router.navigate(['/user-dashboard']);
      return false;
    })
  );
};