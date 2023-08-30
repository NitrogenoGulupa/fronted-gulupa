
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AuthService } from './auth.service';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderFormComponent } from "./header-form/header-form.component";
import { FooterComponent } from "./footer/footer.component";
import { InicioComponent } from "./inicio/inicio.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NosotrosComponent } from "./nosotros/nosotros.component";
import { RecomendacionesComponent } from "./recomendaciones/recomendaciones.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations:[
        AppComponent,
        HeaderFormComponent,
        FooterComponent,
        InicioComponent,
        LoginComponent,
        NosotrosComponent,
        RecomendacionesComponent

    ],
    imports:[
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers:[
        AuthService
    ],
    bootstrap:[AppComponent]
})
export class AppModule{}