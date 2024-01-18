import { Component } from '@angular/core';
import { ModalService } from './servicios/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(

    private modal_service: ModalService

  ){

    //Obtenemos los datos del modal para actualizar
    this.modal_service.enviar_datos_registro_editar.subscribe(
      (respuesta)=>{

        this.datos_registro_editar = respuesta

        console.log(respuesta)
        

      }
    )

  }

  nombre_registro: string = ""

  crear: boolean = true

  campos_modal: {campo: string, tipo: string} [] = [
    
  ]

  datos_registro_editar = []

  get_values(objeto: any){

    return Object.values(objeto)

  }

  ngOnInit(): void {



    if (this.modal_service.iniciar_componente){


      

      this.nombre_registro = this.modal_service.nombre_registro
      this.campos_modal = this.modal_service.campos_modal
  

    }
    
    
    
  }

  cerrar_modal(){


    this.modal_service.iniciar_componente = false
    this.modal_service.campos_modal = []  


  }



}
