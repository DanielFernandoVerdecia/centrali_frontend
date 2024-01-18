import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  iniciar_componente: boolean = false
  nombre_registro: string = ""

  campos_modal: {campo: string, tipo: string} [] = [
    
  ]

  enviar_datos_registro_editar: EventEmitter<[]> = new EventEmitter<[]>


}
