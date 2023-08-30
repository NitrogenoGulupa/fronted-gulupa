
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // Lógica para enviar la solicitud de inicio de sesión a la API y obtener un token.
    // Actualiza this.isAuthenticated en función de la respuesta.

    // Ejemplo simplificado (sin implementación real):
    if (username === 'usuario' && password === 'contraseña') {
      this.isAuthenticated = true;
      return of({ success: true, token: 'example_token' });
    } else {
      return of({ success: false });
    }
  }

  logout() {
    // Lógica para cerrar sesión y eliminar el token.
    this.isAuthenticated = false;
  }

  get isLoggedIn() {
    return this.isAuthenticated;
  }
}