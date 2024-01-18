import { Component, SimpleChanges } from '@angular/core';
import { UsuariosModalService } from './services/usuarios-modal.service';
import { SoloUsuario } from 'src/app/interfaces/ver_solo_usuarios';
import { ActualizarUsuario } from 'src/app/interfaces/actualizar_usuario';
import { UsuariosService } from 'src/app/services/usuarios_service/usuarios.service';
import { CookieService } from 'ngx-cookie-service';

//SweetAlert2
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios-modal',
  templateUrl: './usuarios-modal.component.html',
  styleUrls: ['./usuarios-modal.component.css']
})
export class UsuariosModalComponent {


  nombre_usuario = ""
  cargo_usuario = ""
  is_active = false
  id_usuario = ""

  formulario_modal: FormGroup

  constructor(
    private usuarios_modal_service: UsuariosModalService,
    private usuarios_service: UsuariosService,
    private cookie_service: CookieService,
    private form_builder: FormBuilder
  ){

    //Formulario modal  
    this.formulario_modal = this.form_builder.group(

      {

       
        nombre: ['', [Validators.required]],
        cargo: ['', [Validators.required]],
        is_active: [Boolean, [Validators.required]]

       

      }

    ),

    //Obtener los datos para actualizar Usuarios
    this.usuarios_modal_service.campos_modal_editar.subscribe(

      (respuesta)=>{

   
        
        this.nombre_usuario = respuesta.nombre
        this.cargo_usuario = respuesta.cargo
        this.is_active = respuesta.is_active
        this.id_usuario = String(respuesta.id)

        //Actulizamos los valores del formulario
        this.formulario_modal.patchValue({

          nombre: this.nombre_usuario,
          cargo: this.cargo_usuario,
          is_active: this.is_active
          
        })

      }

    )

    
    

  }  
  

  actualizar_usuario(){

    const usuario_actualizado: ActualizarUsuario = {

      nombre: this.formulario_modal.controls['nombre'].value,
      cargo: this.formulario_modal.controls['cargo'].value,
      is_active: this.formulario_modal.controls['is_active'].value

    }

    const toke_access = this.cookie_service.get('centrali_JWT_access')

    this.usuarios_service.actualizar_usuario_por_id(toke_access, this.id_usuario, usuario_actualizado).subscribe(

      (respuesta)=>{

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario actualizado",
          showConfirmButton: false,
          timer: 3000
        });

        //Cerrar el modal
        this.usuarios_modal_service.cerrar_modal.emit(true)

      },

      (error) => {

        let errors = error.error.Errors;
        let mensaje_obtenido = "";
      
        if (errors) {
          if (errors instanceof Object) {
            mensaje_obtenido = Object.values(errors).join('<br>');
          } else {
            mensaje_obtenido = errors;
          }
        } else if (!errors) {
          let errorObject = error.error;
          if (errorObject instanceof Object) {
            mensaje_obtenido = Object.values(errorObject).join('<br>');
          } else {
            mensaje_obtenido = errorObject;
          }
        } else {
          mensaje_obtenido = "Ha ocurrido un error!";
        }
      
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          html: mensaje_obtenido,
        });
      }

    )



  }

 

  boton_actualizar_usuario(){

   
    //Mostramos el mensaje de error
    if (this.formulario_modal.controls['nombre'].invalid){

      Swal.fire({
        icon: 'error',
        title: 'Formato incorrecto',
        html: 'Escriba un nombre.',
        
      })

    }

    else{

      this.actualizar_usuario()

    }

    

  }  



}
