import { EventEmitter, Injectable } from '@angular/core';
import { SoloUsuario } from 'src/app/interfaces/ver_solo_usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosModalService {

  constructor() { }

  campos_modal_editar: EventEmitter<SoloUsuario> = new EventEmitter<SoloUsuario>;
  id_registro: EventEmitter<string> = new EventEmitter<string>;
  cerrar_modal:EventEmitter<boolean> = new EventEmitter<boolean>; 
  
}
