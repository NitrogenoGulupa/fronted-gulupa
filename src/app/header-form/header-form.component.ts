import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SweetAlertsService } from '../services/sweet-alerts.service';

@Component({
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styleUrls: ['./header-form.component.css'],
})
export class HeaderFormComponent implements OnInit {
  imglogo: string = 'assets/logo.png';
  alert = inject(SweetAlertsService)
  supabase = inject(AuthService);
  router = inject(Router);
  sesion = true;
  ngOnInit() {}

  logOut() {
    this.alert.loadingAlert('Cerrando sesión')
    this.supabase
      .logOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
