import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto';
}



// @Component({
//   selector: 'app-login',
//   template: '...' // Tu plantilla de inicio de sesión
// })
// export class LoginComponent {
//   constructor(private router: Router) {}

//   onLoginSuccess() {
//     // Realiza el proceso de inicio de sesión
//     // ...

//     // Redirige al componente de inicio después del inicio de sesión
//     this.router.navigate(['/inicio']);
//   }
// }