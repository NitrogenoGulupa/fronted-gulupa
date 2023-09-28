import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { SweetAlertsService } from '../services/sweet-alerts.service';

export const loginGuardGuard: CanActivateFn = async (_, state) => {
  const supabase = inject(AuthService);
  const router = inject(Router);
  const alert = inject(SweetAlertsService);
  let session = await supabase.setSesion()
  const message = state.url==='/crear-cuenta' ? 'Primero debes cerrar sesión' : 'Ya has iniciado sesión'
  if(!session){
    return true
  }
  else{
    router.navigate(['/inicio'])
    alert.infoAlert(message,'error')
    return false
  }
  
};
