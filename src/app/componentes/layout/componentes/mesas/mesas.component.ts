import { Component, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mesa } from 'src/app/interfaces/mesa';
import { MesasModalService } from './services/mesas.service';
import { VentaService } from 'src/app/services/ventas_service/venta.service';
import Swal from 'sweetalert2';
import { MesasService } from 'src/app/services/mesas_service/mesas.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent {

  formulario_busqueda: FormGroup

  constructor(

    private cookie_service: CookieService,
    private mesas_service: MesasService,
    private mesa_modal_service: MesasModalService,

    private form_builder: FormBuilder

  ){

    //Formulario de busqueda
    this.formulario_busqueda = this.form_builder.group(

      {

       
        mesa: ['', [Validators.required]],
       

      }

    ),

    //Estar pendiente del cierre del modal
    this.mesa_modal_service.cerrar_modal.subscribe(

      ()=>{
        
        this.cerrar_modal()

        this.cambiar_pagina(this.pagina_actual)

      }

    )

   
    

  }


  ngOnInit(): void {
    
    this.cambiar_pagina(1)
   
    
  }

  registros_datos: Mesa[] = [] 

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

    this.mesas_service.ver_todas_las_mesas(token_access, pagina_actual).subscribe(

      (resultados)=>{

        this.registros_datos = (resultados as any).results.datos
        this.total_registros = (resultados as any).count

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

  
    if (this.seleccionar_registros) {

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

        this.registros_seleccionados.push(actual.id)

      }

    )
   
    

  }

  editar_mesa(id: number){

    this.titulo_modal = "Editar mesa"

    const token_access = this.cookie_service.get('centrali_JWT_access')
    const id_actual = String(id)

   
    //Obtener info de la mesa que se quiere editar
    this.mesas_service.ver_mesa_por_id(token_access, id_actual).subscribe(

      (data)=>{

        const mesa_obtenida = (data as any).respuesta

        this.mesa_modal_service.campos_editar_modal.emit(mesa_obtenida)



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

  eliminar_mesa(id: number){

    
    Swal.fire({
      title: "¿Quiere eliminar esa mesa?",
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
        
        this.mesas_service.eliminar_mesa_por_id(token_access, id_actual).subscribe(

          (respuesta)=>{

            //Obtenemos los datos actualizados de la tabla
            this.cambiar_pagina(this.pagina_actual)

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Mesa eliminada",
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

  eliminar_varias_mesas(){

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

       
        this.mesas_service.eliminar_varias_mesas(token_access, this.registros_seleccionados).subscribe(

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

  buscar_mesa_por_nombre(){

    //Mostramos el mensaje de error
    if (this.formulario_busqueda.controls['mesa'].invalid){

      this.formulario_busqueda.controls['mesa'].markAsTouched()

      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: 'Escriba una mesa.',
        
      })

    }

    else{

      const token_access = this.cookie_service.get('centrali_JWT_access')

      const mesa = this.formulario_busqueda.controls['mesa'].value

  
      this.mesas_service.buscar_mesa_por_nombre(token_access, mesa).subscribe(

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

  
  abrir_crear_modal(){

    this.titulo_modal = "Crear mesa"

    this.mesa_modal_service.modal_crear_producto.emit(true)
    

  }

  cerrar_modal(){

    this.boton_cerrar_modal.nativeElement.click()

  }


}
