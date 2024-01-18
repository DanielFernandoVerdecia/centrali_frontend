import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AnimacionCargandoComponent } from './animaciones/animacion-cargando/animacion-cargando.component';
import { RegistrarseComponent } from './componentes/registrarse/registrarse.component';
import { AnimacionCheckComponent } from './animaciones/animacion-check/animacion-check.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { LayoutComponent } from './componentes/layout/layout.component';
import { IngresosGastosComponent } from './componentes/layout/componentes/ingresos-gastos/ingresos-gastos.component';
import { ModalComponent } from './componentes/layout/componentes/modal/modal.component';
import { IngredientesComponent } from './componentes/layout/componentes/ingredientes/ingredientes.component';
import { ProductosComponent } from './componentes/layout/componentes/productos/productos.component';
import { VentasComponent } from './componentes/layout/componentes/ventas/ventas.component';
import { UsuariosComponent } from './componentes/layout/componentes/usuarios/usuarios.component';
import { MesasComponent } from './componentes/layout/componentes/mesas/mesas.component';
import { IsActiveGuard } from './guards/is_active_guard/is-active.guard';

const routes: Routes = [

  {path:'', redirectTo:'/login' , pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'animacion_cargando', component: AnimacionCargandoComponent},
  {path:'registrarme', component: RegistrarseComponent},
  {path:'recuperar_password', component: RecuperarPasswordComponent},

  //Contenido principal página
  {path:'layout', component:LayoutComponent, canActivate:[IsActiveGuard] , children:[

    

    {path: 'productos', component: ProductosComponent},

    {path: 'mesas', component: MesasComponent},

    {path: 'ventas', component: VentasComponent},

    {path: 'usuarios', component: UsuariosComponent}
  

  ]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
