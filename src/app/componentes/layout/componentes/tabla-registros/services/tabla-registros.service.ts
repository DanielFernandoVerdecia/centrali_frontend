import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablaRegistrosService {

  enviar_nombre_registro: EventEmitter<any> = new EventEmitter<string>();
  enviar_columnas: EventEmitter<any> = new EventEmitter<string[]>();
  enviar_datos: EventEmitter<any> = new EventEmitter<{}[]>();
  enviar_campos_modal: EventEmitter<any> = new EventEmitter<{}[]>;
  enviar_total_registros: EventEmitter<number> = new EventEmitter<number>;

  
}
