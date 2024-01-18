import { Component, ViewChild } from '@angular/core';
import { TablaRegistrosService } from './services/tabla-registros.service';
import { ModalService } from '../modal/servicios/modal.service';
import { CookieService } from 'ngx-cookie-service';
import { UsuariosService } from 'src/app/services/usuarios_service/usuarios.service';

@Component({
  selector: 'app-tabla-registros',
  templateUrl: './tabla-registros.component.html',
  styleUrls: ['./tabla-registros.component.css']
})
export class TablaRegistrosComponent {

  constructor(
    private tabla_registros_service: TablaRegistrosService,

    private modal_service: ModalService,
    private cookie_service: CookieService,
    private usuarios_service: UsuariosService

  ){

    //Actualizar nombre del registro
    this.tabla_registros_service.enviar_nombre_registro.subscribe(

      (nombre_obtenido)=>{

        this.nombre_registro = nombre_obtenido

      }

    )

     //Actualizar las columnas
     this.tabla_registros_service.enviar_columnas.subscribe(

      (columnas_obtenidas)=>{
        this.tabla_columnas = columnas_obtenidas
      }

    )
    
    //Actualizar datos de los registros actuales
    this.tabla_registros_service.enviar_datos.subscribe(

      (datos_obtenidos)=>{

        this.tabla_datos = datos_obtenidos

      }

    )

    //Actualizar cantidad total de registros
    this.tabla_registros_service.enviar_total_registros.subscribe(

      (respuesta)=>{

        this.total_registros = respuesta

      }

    )

    //Actualizar campos del modal
    this.tabla_registros_service.enviar_campos_modal.subscribe(

      (campos_obtenidos)=>{

        this.campos_modal = campos_obtenidos

      }

    )

  }

  nombre_registro = ""

  tabla_columnas: string[] = []

  tabla_datos: {id:number}[] = []


  seleccionar_registros = false
  registros_seleccionados: any[] = []

  pagina_actual: number = 1
  total_registros: number = 0

  datos_registro_editar = []
  
  //Cambiar de página la tabla
  cambiar_pagina(event: any){

    this.pagina_actual = event

    //Obtenemos la actual página

    const toke_access = this.cookie_service.get('centrali_JWT_access')

    const pagina_actual = String(this.pagina_actual)

    this.usuarios_service.ver_todos_los_usuarios(toke_access, pagina_actual).subscribe(

      (respuesta)=>{

        
        this.tabla_datos = (respuesta as any).results.datos
        this.total_registros = (respuesta as any).count
        

      },

      (error)=>{

        console.log(error)

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
    this.tabla_datos.forEach(

      (actual)=>{

        this.registros_seleccionados.push(actual.id)

      }

    )
   
    

  }


  editar_registro(id: number){

    const id_obtenido = String(id)

    //Para usuarios
    if (this.nombre_registro == "Usuario"){

      //Obtener el usuario solicitado

      const toke_access = this.cookie_service.get('centrali_JWT_access')

      this.usuarios_service.ver_usuario_por_id(toke_access, id_obtenido).subscribe(

        (data)=>{

          this.modal_service.enviar_datos_registro_editar.emit(
            (data as any).respuesta)

      
        },

        (errores)=>{

          console.log(errores)

        }
        
      )

    }


    //Abrir Modal
    this.abrir_modal()
    
  }


  //Para obtener los valores del objeto actual
  get_values(objeto: any){

    return Object.values(objeto)

  }

  //-------------Modal-------------
  @ViewChild('Modal') Modal!:any;
  
  campos_modal = []

  abrir_modal(){

    
    
    this.modal_service.nombre_registro = this.nombre_registro
    this.modal_service.iniciar_componente = true
    this.modal_service.campos_modal = this.campos_modal

    this.Modal.ngOnInit()
    
  }

  //-------------Fin Modal-------------


}
