import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { SweetAlertsService } from '../services/sweet-alerts.service';

export const homeGuardGuard: CanActivateFn = async () => {
  const supabase = inject(AuthService);
  const router = inject(Router);
  const alert = inject(SweetAlertsService)
  let user = await supabase.getUser()
  if(user.data.session){
    return true
  }
  else{
    router.navigate(['/login'])
    alert.infoAlert('Debes iniciar sesión', 'error')
    return false
  }
};
