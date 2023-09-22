import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SweetAlertsService } from '../services/sweet-alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.component.html',
  styleUrls: ['./recuperar-cuenta.component.css'],
})
export class RecuperarCuentaComponent {
  loading = false;
  fb = inject(FormBuilder);
  supabase = inject(AuthService);
  alert = inject(SweetAlertsService);
  router = inject(Router);
  formForgotPassword = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  async resetPassword() {
    if (this.formForgotPassword.controls.email.status === 'INVALID') {
      this.alert.infoAlert('Correo invalido', 'error');
      return;
    }
    const { email } = this.formForgotPassword.value;
    if (email) {
      this.loading = true;
      try {
        const { data, error } = await this.supabase.resetPassword(email);
        if (data) {
          this.loading = false;
          this.alert.infoAlert(
            'Se ha enviado un link de recuperación a tú correo',
            'info'
          );
        }
        if (error) {
          this.loading = false;
          console.log(error);
        }
      } catch (error) {
        this.loading = false;
        this.alert.infoAlert('Ha ocurrido un error', 'error');
      }
      this.formForgotPassword.reset();
    }
  }
}
