import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MesasModalService } from '../services/mesas.service';
import { CookieService } from 'ngx-cookie-service';
import { MesasService } from 'src/app/services/mesas_service/mesas.service';
import Swal from 'sweetalert2';
import { CrearEditarMesa } from 'src/app/interfaces/crear_editar_mesa';

@Component({
  selector: 'app-mesas-modal',
  templateUrl: './mesas-modal.component.html',
  styleUrls: ['./mesas-modal.component.css']
})
export class MesasModalComponent {


  formulario_modal: FormGroup

  editar_modal: boolean = false

  id_mesa = ""

  formulario_valido: boolean = false

  constructor(

    private form_builder: FormBuilder,
    private mesas_service: MesasService,
    private cookie_service: CookieService,
    private mesas_modal_service: MesasModalService

  ){

    //Formulario modal  
    this.formulario_modal = this.form_builder.group(

      {

       
        mesa: ['', [Validators.required]],
        
      
      }

    )

    //Limpiar el contenido anterior al abrir el modal para crear mesa
    this.mesas_modal_service.modal_crear_producto.subscribe(

      ()=>{

        

        //Dejamos vacíos los valores del formularios
        this.formulario_modal.patchValue({

          mesa: ''
          
        })

        this.formulario_modal.controls['mesa'].markAsUntouched()

        //Mostramos el botón de crear mesa
        this.editar_modal = false


      }

    ) 

    //Obtener valores para editar mesa
    this.mesas_modal_service.campos_editar_modal.subscribe(

      (respuesta)=>{

        //Obtener el id de la mesa
        this.id_mesa = String(respuesta.id)

        //Actulizamos los valores del formulario
        this.formulario_modal.patchValue({

          mesa: respuesta.nombre,

        })

        //Mostramos el botón de actualizar producto
        this.editar_modal = true

      }

    )

  }


  validar_formulario(){


    let recolector_errores = ""

    if (this.formulario_modal.controls['mesa'].invalid) {

      recolector_errores += "Escriba una mesa correcta. <br>" 

      this.formulario_modal.controls['mesa'].markAsTouched()

    }

    
    if (recolector_errores.length > 0) {

      this.formulario_valido = false

      Swal.fire({
        icon: 'error',
        title: 'Formato incorrecto',
        html: recolector_errores,
        
      })

    }

    else{

      this.formulario_valido = true

    }



  }

  crear_mesa(){

    this.validar_formulario()

    if (this.formulario_valido){

      const mesa_nombre = this.formulario_modal.controls['mesa'].value 
      
      const token_access = this.cookie_service.get('centrali_JWT_access')

      const nueva_mesa: CrearEditarMesa = {
        nombre: mesa_nombre
      }

      
      this.mesas_service.crear_mesa(token_access, nueva_mesa).subscribe(

        (respuesta)=>{

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Mesa creada con éxito",
            showConfirmButton: false,
            timer: 3000
          });

          //Cerrar el modal
          this.mesas_modal_service.cerrar_modal.emit(true);
          

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

 
  actualizar_mesa(){

    this.validar_formulario()

    if (this.formulario_valido){

      const mesa_nombre = this.formulario_modal.controls['mesa'].value 
      
      const token_access = this.cookie_service.get('centrali_JWT_access')

      const mesa_actualizada: CrearEditarMesa = {
        nombre: mesa_nombre
      }
  

      this.mesas_service.actualizar_mesa_por_id(token_access, this.id_mesa, mesa_actualizada).subscribe(
  
        (respuesta)=>{
  
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Mesa actualizada",
            showConfirmButton: false,
            timer: 3000
          });
  
          //Cerrar el modal
          this.mesas_modal_service.cerrar_modal.emit(true)
  
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

}
