
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component'; 
import { NosotrosComponent } from './nosotros/nosotros.component'; 
import { AyudaComponent } from './ayuda/ayuda.component';
// import { AuthGuard } from './auth.guards';

const routes: Routes = [

  { path: 'inicio', component: InicioComponent }, 
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, 
  { path: 'recomendaciones', component: RecomendacionesComponent }, 
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'ayuda', component: AyudaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }







