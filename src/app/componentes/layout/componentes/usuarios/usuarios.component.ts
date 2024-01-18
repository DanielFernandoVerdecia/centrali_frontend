import { Component, ElementRef, ViewChild } from '@angular/core';
import { TablaRegistrosService } from '../tabla-registros/services/tabla-registros.service';
import { UsuariosService } from 'src/app/services/usuarios_service/usuarios.service';
import { CookieService } from 'ngx-cookie-service';
import { TodoLosUsuarios } from 'src/app/interfaces/todos_los_usuarios';
import { UsuariosModalService } from './usuarios-modal/services/usuarios-modal.service';
import { DatePipe } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//SweetAlert2
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  formulario_busqueda: FormGroup

  constructor(

    private tabla_registro_service: TablaRegistrosService,
    private usuarios_service: UsuariosService,
    private cookie_service: CookieService,
    private usuarios_modal_service: UsuariosModalService,

    private form_builder: FormBuilder

  ){

    //Formulario de busqueda
    this.formulario_busqueda = this.form_builder.group(

      {

       
        nombre: ['', [Validators.required]],
       

      }

    ),

    //En caso de cerrar el Modal
    this.usuarios_modal_service.cerrar_modal.subscribe(

      ()=>{

        this.cerrar_modal()

        //Obtenemos los datos actualizados de la tabla
        this.cambiar_pagina(this.pagina_actual)

      }

    )

  }


  ngOnInit(): void {
    
    const token_access = this.cookie_service.get('centrali_JWT_access')
    const pagina_actual = String(this.pagina_actual)

    //Obtener el id del usuario actual
    this.usuarios_service.obtener_id_usuario_by_token(token_access).subscribe(

      (id)=>{


        this.id_usuario_actual = (id as any).respuesta
       

      }

    )


    this.usuarios_service.ver_todos_los_usuarios(token_access, pagina_actual).subscribe(

      (resultados)=>{

        this.registros_datos = (resultados as any).results.datos
        this.total_registros = (resultados as any).count

    
      },

      (errores) =>{
  
  
        let errors = errores.error.Errors


        let mensaje_obtenido = ""

        if ( typeof errors == 'string' ){

          mensaje_obtenido = errors 

        }

        else if (errors instanceof Array ){

          mensaje_obtenido = errors.join('<br>');

        }
        
        else{
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
  
  id_usuario_actual = 0

  registros_datos: TodoLosUsuarios[] = [] 

  seleccionar_registros = false
  registros_seleccionados: any[] = []

  pagina_actual: number = 1
  total_registros: number = 0

  datos_registro_editar = []

  titulo_modal = ""
  
  //Cambiar de página la tabla
  cambiar_pagina(event: any){

    this.pagina_actual = event

    //Obtenemos la actual página

    const token_access = this.cookie_service.get('centrali_JWT_access')

    const pagina_actual = String(this.pagina_actual)

    this.usuarios_service.ver_todos_los_usuarios(token_access, pagina_actual).subscribe(

      (respuesta)=>{

        
        this.registros_datos = (respuesta as any).results.datos
        this.total_registros = (respuesta as any).count
        

      },

      (data)=>{

    
        this.registros_datos = []

        const error_obtenido = (data as any).error.Errors
        let mostrar_error = ""


        if (error_obtenido){

          mostrar_error = error_obtenido 

        }

        else{

          mostrar_error = "Ha ocurrido un error!"

        }


        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: mostrar_error,
          
        })

  


      }

    )

  }

  //En el DropDown para activar o desactivar selección registros
  select_on_off(){

     //Activar selección
     if(!this.seleccionar_registros){

      this.seleccionar_registros = true

      }   
    
    //Desactivar selección
    else{

      this.seleccionar_registros = false

      this.registros_seleccionados = []

    }

  }

  //Acción de seleccionar los registros uno por uno
  elegir_registro(id_obtenido: any){

  
    if (this.seleccionar_registros && (id_obtenido != this.id_usuario_actual)) {

      const indice = this.registros_seleccionados.indexOf(id_obtenido)
    
      //Agregar a seleccionados
      if (indice == -1){

        this.registros_seleccionados.push(id_obtenido)

      }

      //Quitar de seleccionados
      else{

        this.registros_seleccionados.splice(indice, 1)

      } 

    } 

      

  }
  //Fin Acción de seleccionar los registros uno por uno

  elegir_todos_registro(){


    //Vaciar todo seleccionado
    this.registros_seleccionados = []

    //Obtener el ID de cada registro
    this.registros_datos.forEach(

      (actual)=>{

        if (actual.id != this.id_usuario_actual){

          this.registros_seleccionados.push(actual.id)

        }

        

      }

    )
   
    

  }

  editar_usuario(id: number){

    this.titulo_modal = "Editar usuario"

    const token_access = this.cookie_service.get('centrali_JWT_access')
    const id_actual = String(id)

  
    //Obtener los datos del usuario seleccionado para actualizarlos
    this.usuarios_service.ver_usuario_por_id(token_access, id_actual).subscribe(

      (data)=>{

        this.usuarios_modal_service.campos_modal_editar.emit(
          (data as any).respuesta
        )

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

  eliminar_usuario(id: number){

    
    Swal.fire({
      title: "¿Quiere eliminar ese usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {

        const token_access = this.cookie_service.get('centrali_JWT_access')
        const id_actual = String(id)

        this.usuarios_service.eliminar_usuario_por_id(token_access, id_actual).subscribe(

          (respuesta)=>{

            //Obtenemos los datos actualizados de la tabla
            this.cambiar_pagina(this.pagina_actual)

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Usuario eliminado",
              showConfirmButton: false,
              timer: 3000
            });

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
    });

    

  }

  eliminar_varios_usuarios(){

    Swal.fire({
      title: "¿Quieres eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {

        const token_access = this.cookie_service.get('centrali_JWT_access')

        this.usuarios_service.eliminar_varios_usuarios_por_id(token_access, this.registros_seleccionados).subscribe(

          (respuesta)=>{

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Se ha realizado la eliminación",
              showConfirmButton: false,
              timer: 3000
            });

            //Obtenemos los actuales registros
            this.cambiar_pagina(this.pagina_actual)

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
    });

    

  }

  buscar_usuario_por_nombre(){

   

    //Mostramos el mensaje de error
    if (this.formulario_busqueda.controls['nombre'].invalid){

      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: 'Escriba un nombre.',
        
      })

    }

    else{

      const token_access = this.cookie_service.get('centrali_JWT_access')

      const nombre = this.formulario_busqueda.controls['nombre'].value

  

      this.usuarios_service.buscar_usuarios_por_nombre(token_access, nombre).subscribe(

        (respuesta)=>{

          this.registros_datos = (respuesta as any).results.datos
          this.total_registros = (respuesta as any).count

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

  }

  //botón cerrar modal
  @ViewChild('boton_cerrar_modal') boton_cerrar_modal!: ElementRef;

  cerrar_modal(){

    this.boton_cerrar_modal.nativeElement.click()

  }

  

}
