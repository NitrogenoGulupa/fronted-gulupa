import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private sesion$:Subject<boolean> = new Subject();
  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );
  }

  get sesion() {
    return this.sesion$.asObservable()
  }

  register(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  async login(email: string, password: string) {
    const response = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (response.data.session) this.sesion$.next(true);
    return response;
  }

  async logOut() {
    const response = await this.supabase.auth.signOut();
    if (response === null) this.sesion$.next(false);
    return response;
  }

  async setSesion() {
    const {data} = await this.supabase.auth.getSession();
    data.session ? this.sesion$.next(true) : this.sesion$.next(false);
    return data.session;
  }

  resetPassword(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email)
  }
}
