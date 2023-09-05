
// import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   showModal: boolean = false;

//   //openModal() {
//     //this.showModal = true;
//   //}

//   //closeModal() {
//     //this.showModal = false;
//   //}
//   username = '';
//   password = '';

//   constructor(private authService: AuthService) {}

//   login() {
//     this.authService.login(this.username, this.password).subscribe(response => {
//       if (response.success) {
//         this.showModal = true;
//         // Redirigir al usuario a la página de inicio
//         // Aquí también puedes guardar el token en el almacenamiento local.
//       } else {
//         // Mostrar un mensaje de error de inicio de sesión
//       }
//     });
//   }

//   closeModal() {
//     this.showModal = false;
//   }
// }

