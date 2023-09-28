import { Injectable, inject } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Subject } from 'rxjs';
import { admins } from 'src/app/data/administrators';
import { environment } from 'src/environments/environment.development';
import { SweetAlertsService } from './sweet-alerts.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private sesion$: Subject<boolean> = new Subject();
  private admin$: Subject<boolean> = new Subject();
  alert = inject(SweetAlertsService)
  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );
  }

  get sesion() {
    return this.sesion$.asObservable();
  }

  get admin() {
    return this.admin$.asObservable();
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
    if (response.error === null) {
      this.sesion$.next(false);
      this.admin$.next(false);
    }
    this.alert.closeAllAlerts()
    return response;
  }

  async setSesion() {
    const { data } = await this.supabase.auth.getSession();
    data.session ? this.sesion$.next(true) : this.sesion$.next(false);
    return data.session;
  }

  async isAdmin() {
    const { data } = await this.supabase.auth.getSession();
    if (data.session && admins.includes(data.session.user.id)) {
      this.admin$.next(true);
      return true;
    } else {
      this.admin$.next(false);
      return false;
    }
  }

  resetPassword(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: environment.supabase.urlRedirect,
    });
  }

  updatePassword(email: string, password: string) {
    return this.supabase.auth.updateUser({ email, password });
  }
}
