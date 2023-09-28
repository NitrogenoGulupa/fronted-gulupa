import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const resetPasswordGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if (route.fragment) {
    return true
  } else {
    router.navigate(['/forbidden'])
    return false;
  }
};
