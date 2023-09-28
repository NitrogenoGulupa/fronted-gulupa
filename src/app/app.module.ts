
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderFormComponent } from "./componets/header-form/header-form.component";
import { FooterComponent } from "./componets/footer/footer.component";
import { LoginComponent} from "./pages/login/login.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NosotrosComponent } from "./pages/nosotros/nosotros.component";
import { RecomendacionesComponent } from "./pages/recomendaciones/recomendaciones.component";
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { NgxFileDropModule } from 'ngx-file-drop'; 
import { CrearCuentaComponent } from "./pages/crear-cuenta/crear-cuenta.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RecuperarCuentaComponent } from './pages/recuperar-cuenta/recuperar-cuenta.component';
import { NuevaContraComponent } from './pages/nueva-contra/nueva-contra.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';

@NgModule({
    declarations:[
        AppComponent,
        FooterComponent,
        HeaderFormComponent,
        InicioComponent,
        LoginComponent,
        CrearCuentaComponent,
        NosotrosComponent,
        RecomendacionesComponent,
        AyudaComponent,
        RecuperarCuentaComponent,
        NuevaContraComponent,
        ForbiddenComponent,
 
    ],

    imports:[
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserModule,
        NgxFileDropModule,
        BrowserAnimationsModule,
        SweetAlert2Module.forRoot()
    ],
    providers:[],
    bootstrap:[AppComponent]
})
export class AppModule{}