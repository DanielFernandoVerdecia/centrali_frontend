import { EventEmitter, Injectable } from '@angular/core';
import { EditarVenta } from 'src/app/interfaces/editar_venta';
import { VerVenta } from 'src/app/interfaces/ventas';

@Injectable({
  providedIn: 'root'
})
export class VentaModalService {

  constructor() { }

  modal_crear_venta: EventEmitter<boolean> = new EventEmitter<boolean>;
  venta_creada: EventEmitter<boolean>  = new EventEmitter<boolean>;
  campos_editar_modal: EventEmitter<EditarVenta> = new EventEmitter<EditarVenta>;
  cerrar_modal: EventEmitter<boolean> = new EventEmitter<boolean>;

}
