import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      'https://pxoiajdjcdrfhhnkeysi.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4b2lhamRqY2RyZmhobmtleXNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4NDQyNjcsImV4cCI6MjAwOTQyMDI2N30.TlfdzLzL9OuDxZHfnTsj6_S6APkv_pLYuzvVU8WX07s'
    );
  }

  register(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  login(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  getUser() {
    return this.supabase.auth.getSession();
  }

  logOut() {
    return this.supabase.auth.signOut();
  }
}
