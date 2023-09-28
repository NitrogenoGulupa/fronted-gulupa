import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { SweetAlertsService } from '../services/sweet-alerts.service';

export const homeGuardGuard: CanActivateFn = async () => {
  const supabase = inject(AuthService);
  const router = inject(Router);
  const alert = inject(SweetAlertsService)
  supabase.isAdmin()
  let sesion = await supabase.setSesion()
  if(sesion){
    return true
  }
  else{
    router.navigate(['/login'])
    alert.infoAlert('Debes iniciar sesión', 'error')
    return false
  }
};
