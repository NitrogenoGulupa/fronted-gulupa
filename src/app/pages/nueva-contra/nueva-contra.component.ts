import { Component, ElementRef, ViewChild, Renderer2, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { SweetAlertsService } from '../../shared/services/sweet-alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-contra',
  templateUrl: './nueva-contra.component.html',
  styleUrls: ['./nueva-contra.component.css']
})
export class NuevaContraComponent {
  loading = false;
  view = false;
  render2 = inject(Renderer2);
  fb = inject(FormBuilder);
  supabase = inject(AuthService);
  alert = inject(SweetAlertsService);
  router = inject(Router);
  formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })
  
  @ViewChild('inputPassword') inputPassword!: ElementRef;

  async updatePassword(){
    if (this.formLogin.controls.email.status === 'INVALID') {
      this.alert.infoAlert('Correo invalido', 'error');
      return;
    }
    if (this.formLogin.controls.password.status === 'INVALID') {
      this.alert.infoAlert('Contraseña debe ser mayor a 8 caracteres', 'error');
      return;
    }
    const { email, password } = this.formLogin.value;
    if (email && password){
      this.loading = true
      try {
        const { data } = await this.supabase.updatePassword(email,password)
        data.user 
        ? this.alert.infoAlertNavigate('Contraseña actualizada correctamente', 'Inicia sesión', 'Ok', 'info', '/login') 
        : this.alert.infoAlert('Ha ocurrido un error, intenta de nuevo', 'error')
        this.loading = false
      } catch (error) {
        this.loading = false
        this.alert.infoAlert('Ha ocurrido un error de conexión, intenta de nuevo', 'error')
      }
    }
    
  }

  showPassword(){
    const pass = this.inputPassword.nativeElement
    this.view 
    ? this.render2.setProperty(pass, 'type', 'password') 
    : this.render2.setProperty(pass, 'type', 'text')
    this.view = !this.view
  }

}



