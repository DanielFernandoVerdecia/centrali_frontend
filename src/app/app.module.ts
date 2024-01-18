import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { AnimacionCargandoComponent } from './animaciones/animacion-cargando/animacion-cargando.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistrarseComponent } from './componentes/registrarse/registrarse.component';
import { AnimacionEscribiendoComponent } from './animaciones/animacion-escribiendo/animacion-escribiendo.component';
import { AnimacionCheckComponent } from './animaciones/animacion-check/animacion-check.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { LayoutComponent } from './componentes/layout/layout.component';
import { IngresosGastosComponent } from './componentes/layout/componentes/ingresos-gastos/ingresos-gastos.component';


import { NgApexchartsModule } from 'ng-apexcharts';
import { ModalComponent } from './componentes/layout/componentes/modal/modal.component';
import { IngredientesComponent } from './componentes/layout/componentes/ingredientes/ingredientes.component';
import { ProductosComponent } from './componentes/layout/componentes/productos/productos.component';
import { TablaRegistrosComponent } from './componentes/layout/componentes/tabla-registros/tabla-registros.component';
import { VentasComponent } from './componentes/layout/componentes/ventas/ventas.component';
import { UsuariosComponent } from './componentes/layout/componentes/usuarios/usuarios.component';

//Login Facebook y Gmail
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';

import { OAuthModule } from 'angular-oauth2-oidc';


import {HttpClientModule} from '@angular/common/http'

//Para las cookies
import {CookieService} from 'ngx-cookie-service';

//Paginación de las tablas
import {NgxPaginationModule} from 'ngx-pagination';
import { UsuariosModalComponent } from './componentes/layout/componentes/usuarios/usuarios-modal/usuarios-modal.component';
import { IsActivePipe } from './pipes/is_valid/is-active.pipe';
import { FechaFormatoPipe } from './pipes/fecha/fecha-formato.pipe';
import { ProductosModalComponent } from './componentes/layout/componentes/productos/productos-modal/productos-modal.component';
import { FechaNullPipe } from './pipes/fecha_null/fecha-null.pipe';
import { VentaModalComponent } from './componentes/layout/componentes/ventas/venta-modal/venta-modal.component';
import { SiNoPipe } from './pipes/si_no/si-no.pipe';
import { StringNullPipe } from './pipes/string-null/string-null.pipe';

import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbDatepickerI18n, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { JsonPipe } from '@angular/common';


import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
import localeEsExtra from "@angular/common/locales/extra/es";
import { MesasComponent } from './componentes/layout/componentes/mesas/mesas.component';
import { MesasModalComponent } from './componentes/layout/componentes/mesas/mesas-modal/mesas-modal.component';
import { PesosColombianosPipe } from './pipes/pesos_colombianos/pesos-colombianos.pipe';

registerLocaleData(localeEs, "es", localeEsExtra);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AnimacionCargandoComponent,
    RegistrarseComponent,
    AnimacionEscribiendoComponent,
    AnimacionCheckComponent,
    RecuperarPasswordComponent,
    LayoutComponent,
    IngresosGastosComponent,
    ModalComponent,
    IngredientesComponent,
    ProductosComponent,
    TablaRegistrosComponent,
    VentasComponent,
    UsuariosComponent,
    UsuariosModalComponent,
    IsActivePipe,
    FechaFormatoPipe,
    ProductosModalComponent,
    FechaNullPipe,
    VentaModalComponent,
    SiNoPipe,
    StringNullPipe,
    MesasComponent,
    MesasModalComponent,
    PesosColombianosPipe
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    SocialLoginModule,

    OAuthModule.forRoot(),
    
    ReactiveFormsModule,

    FormsModule,

    NgApexchartsModule,

    HttpClientModule,

    NgxPaginationModule,

    FormsModule,

    NgbModule,

    NgbDatepickerModule, 
 
    JsonPipe



    
  ],
  providers: [

   {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [

          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1049091302941169'),
          }

        ],

        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },

   CookieService,

   { provide: LOCALE_ID, useValue: "es-ES"}
   
  
   

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
