
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderFormComponent } from "./header-form/header-form.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent} from "./login/login.component";
import { InicioComponent } from "./inicio/inicio.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NosotrosComponent } from "./nosotros/nosotros.component";
import { RecomendacionesComponent } from "./recomendaciones/recomendaciones.component";
import { AyudaComponent } from './ayuda/ayuda.component';
import { NgxFileDropModule } from 'ngx-file-drop'; 
import { CrearCuentaComponent } from "./crear-cuenta/crear-cuenta.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RecuperarCuentaComponent } from './recuperar-cuenta/recuperar-cuenta.component';

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