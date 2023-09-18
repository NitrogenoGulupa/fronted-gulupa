
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
// import { AuthService } from './auth.service';
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
        AyudaComponent
    ],

    imports:[
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserModule,
        NgxFileDropModule
    ],
    // providers:[
    //     AuthService
    // ],
    providers:[],
    bootstrap:[AppComponent]
})
export class AppModule{}