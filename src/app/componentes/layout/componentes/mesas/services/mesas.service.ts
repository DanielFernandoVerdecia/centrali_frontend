import { EventEmitter, Injectable } from '@angular/core';
import { Mesa } from 'src/app/interfaces/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesasModalService {

  constructor() { }

  modal_crear_producto: EventEmitter<boolean> = new EventEmitter<boolean>;
  campos_editar_modal: EventEmitter<Mesa> = new EventEmitter<Mesa>;
  cerrar_modal: EventEmitter<boolean> = new EventEmitter<boolean>;

}
