
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component'; 
import { NosotrosComponent } from './nosotros/nosotros.component'; 
import { AyudaComponent } from './ayuda/ayuda.component';
import { LoginComponent } from './login/login.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
// import { AuthGuard } from './auth.guards';

const routes: Routes = [

  { path: 'inicio', component: InicioComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'recomendaciones', component: RecomendacionesComponent }, 
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'ayuda', component: AyudaComponent},
  { path: 'crear-cuenta', component:CrearCuentaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }







