import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SweetAlertsService } from '../services/sweet-alerts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'],
})
export class CrearCuentaComponent {
  loading = false;
  fb = inject(FormBuilder);
  supabase = inject(AuthService);
  alert = inject(SweetAlertsService);
  router = inject(Router);
  formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  register() {
    if (this.formLogin.controls.email.status === 'INVALID') {
      this.alert.infoAlert('Correo invalido', 'error');
      return;
    }
    if (this.formLogin.controls.password.status === 'INVALID') {
      this.alert.infoAlert('Contraseña debe ser mayor a 8 caracteres', 'error');
      return;
    }
    const { email, password } = this.formLogin.value;
    if (email && password) {
      this.loading = true;
      this.supabase
        .register(email, password)
        .then((res) => {
          this.loading = false;
          console.log(res);
          this.alert.infoAlertNavigate('Verifica tu correo electrónico', 'Revisa el spam', 'Ok', 'info', '/login')
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    }
  }
}
