import { Component, ViewChild } from '@angular/core';
import { ModalService } from './componentes/modal/servicios/modal.service';
import { UsuariosService } from 'src/app/services/usuarios_service/usuarios.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {



  constructor(

    private modal_service: ModalService,
    private usuarios_service: UsuariosService,
    private cookie_service: CookieService,
    private router: Router

  ){

  }


  nombre_usuario: string = ""
  cargo_usuario = ""

  //-------------Modal-------------

  nombre_opcion: string = "";
  iniciar_componente: boolean = false;


  @ViewChild('Modal') Modal!:any;
  

  campos_modal: {campo: string, tipo: string} [] = [] 

  
  abrir_modal(tipo_opcion_menu: string){

    this.campos_modal = []
    
    if (tipo_opcion_menu == 'configuracion'){

      this.nombre_opcion = "Configuración"

      this.modal_service.nombre_registro = this.nombre_opcion

      const campo_actual = {campo: '', tipo: 'configuracion'}

      this.campos_modal.push(campo_actual)

      

    }

    else{

      this.nombre_opcion = "Reportar algún fallo"

      this.modal_service.nombre_registro = this.nombre_opcion

      const campo_actual = {campo: '', tipo: 'repotar_bug'}

      this.campos_modal.push(campo_actual)


    }


    this.modal_service.campos_modal = this.campos_modal
    this.modal_service.iniciar_componente = true
    

    this.Modal.ngOnInit()


  }

  //-------------Fin Modal-------------

  ngOnInit(): void {

    const nombre_obtenido_usuario = localStorage.getItem('nombre_usuario_centrali')
    const nombre_obtenido = nombre_obtenido_usuario ? nombre_obtenido_usuario:''
    
    this.nombre_usuario = nombre_obtenido
    
    const cargo_usuario = localStorage.getItem('cargo_usuario_centrali') || ''
    this.cargo_usuario = cargo_usuario
    
  }

  logOut(){

    const token_access = this.cookie_service.get('centrali_JWT_access')

    this.usuarios_service.logout(token_access).subscribe(

      (data)=>{

        this.cookie_service.delete('centrali_JWT_access');
        this.cookie_service.delete('centrali_JWT_refresh');

        localStorage.removeItem('nombre_usuario_centrali')
        localStorage.removeItem('cargo_usuario_centrali')

        this.router.navigate(['/login']);

        

      },

      (errores) =>{

        let errors = errores.error.Errors

        let mensaje_obtenido = ""

        if (errors) {


          mensaje_obtenido = errors

        }

        else {

          mensaje_obtenido = "Ha ocurrido un error!"

        }
        
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          html: mensaje_obtenido,
        });
  
      }

    )

  }

}
