import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SweetAlertsService } from '../services/sweet-alerts.service';

export const createAccountGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)
  const alert = inject(SweetAlertsService)
  const supabase = inject(AuthService)
  const admin = await supabase.isAdmin()
  if (admin) {
    return true
  } else {
    router.navigate(['/login'])
    alert.infoAlert('Solo los administradores tienen acceso a este panel', 'error')
    return false
  }
};
