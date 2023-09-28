
import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { SweetAlertsService } from '../../shared/services/sweet-alerts.service';
import { Router } from '@angular/router';

 @Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
 })

 export class LoginComponent  {
  loading = false
  view = false
  render2 = inject(Renderer2)
  fb = inject(FormBuilder)
  supabase = inject(AuthService)
  alert = inject(SweetAlertsService)
  router =  inject(Router)
  formLogin = this.fb.group({
    email : ['',[Validators.required, Validators.email]],
    password : ['',[Validators.required, Validators.minLength(8)]]
  })

  @ViewChild('inputPassword') inputPassword!: ElementRef;


  login() {
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
        .login(email, password)
        .then(({data, error}) => {
          this.loading = false;
          if (error){
            const message = error.message == 'Email not confirmed' ? 'Correo sin confirmar' : 'Credenciales inválidas' 
            this.alert.infoAlert(message,'error')
            return
          }
          if (data.session) this.router.navigate(['/inicio'])
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    }
  }
  
  showPassword(){
    const pass = this.inputPassword.nativeElement
    if (this.view) {
      this.render2.setProperty(pass, 'type', 'password')
    }
    else {
      this.render2.setProperty(pass, 'type', 'text')
    }
    this.view = !this.view
  }
}


