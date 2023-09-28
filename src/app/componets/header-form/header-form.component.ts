import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { SweetAlertsService } from '../../shared/services/sweet-alerts.service';

@Component({
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styleUrls : ['./header-form.component.css']
})
export class HeaderFormComponent {
  alert = inject(SweetAlertsService)
  supabase = inject(AuthService);
  router = inject(Router);
  sesion = this.supabase.sesion;
  admin = this.supabase.admin;

  logOut() {
    this.alert.loadingAlert('Cerrando sesión')
    this.supabase
      .logOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
        this.alert.infoAlert('Error al cerra la sesión, intentalo de nuevo', 'error');
      });
  }
}
