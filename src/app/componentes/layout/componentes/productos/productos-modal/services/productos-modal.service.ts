import { EventEmitter, Injectable } from '@angular/core';
import { VerSoloProducto } from 'src/app/interfaces/ver_solo_producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosModalService {

  constructor() { }

  modal_crear_producto: EventEmitter<boolean> = new EventEmitter<boolean>;
  campos_editar_modal: EventEmitter<VerSoloProducto> = new EventEmitter<VerSoloProducto>;
  cerrar_modal: EventEmitter<boolean> = new EventEmitter<boolean>;

}
