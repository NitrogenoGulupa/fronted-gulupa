import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { SweetAlertsService } from '../services/sweet-alerts.service';

export const loginGuardGuard: CanActivateFn = async () => {
  const supabase = inject(AuthService);
  const router = inject(Router);
  const alert = inject(SweetAlertsService)
  let user = await supabase.getUser()
  if(user.data.session){
    alert.infoAlert('Sesión ya iniciada', 'info')
    router.navigate(['/inicio'])
    return false
  }
  else{
    return true
  }
};
