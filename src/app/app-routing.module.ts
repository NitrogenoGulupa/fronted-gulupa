
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component'; // Asegúrate de importar el componente adecuado
import { NosotrosComponent } from './nosotros/nosotros.component'; // Asegúrate de importar el componente adecuado 
import { AuthGuard } from './auth.guards';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent,canActivate: [AuthGuard] }, // Ruta para el componente InicioComponent
  { path: 'recomendaciones', component: RecomendacionesComponent }, // Ruta para el componente RecomendacionesComponent
  { path: 'nosotros', component: NosotrosComponent },
  { path: '', redirectTo: '/inicio', pathMatch:'full' },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige a 'inicio' por defecto
  { path: 'inicio', component: InicioComponent }, // Otras rutas aquí...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }







