import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { LoginComponent } from './login/login.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { homeGuardGuard } from './guards/home-guard.guard';
import { loginGuardGuard } from './guards/login-guard.guard';
// import { AuthGuard } from './auth.guards';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, canActivate: [homeGuardGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loginGuardGuard] },
  {
    path: 'recomendaciones',
    component: RecomendacionesComponent,
    canActivate: [homeGuardGuard],
  },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'ayuda', component: AyudaComponent },
  {
    path: 'crear-cuenta',
    component: CrearCuentaComponent,
    canActivate: [loginGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
