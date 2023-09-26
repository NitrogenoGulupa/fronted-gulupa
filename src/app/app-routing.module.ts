import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { LoginComponent } from './pages/login/login.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { homeGuardGuard } from './shared/guards/home-guard.guard';
import { loginGuardGuard } from './shared/guards/login-guard.guard';
import { RecuperarCuentaComponent } from './pages/recuperar-cuenta/recuperar-cuenta.component';
import { NuevaContraComponent } from './pages/nueva-contra/nueva-contra.component';
// import { AuthGuard } from './auth.guards';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, canActivate: [homeGuardGuard] },
  { path: 'login', component: LoginComponent, canActivate: [] },
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
    canActivate: [],
  },
  {
    path: 'recuperar-cuenta',
    component: RecuperarCuentaComponent,
    canActivate: [],
  },
  {
    path: 'nueva-contra',
    component: NuevaContraComponent,
    // canActivate: [loginGuarduard],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
