import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    const currentUrl = router.url;
    localStorage.setItem('redirectUrl', currentUrl);
    return router.createUrlTree(['/auth/login']);
  }
};
