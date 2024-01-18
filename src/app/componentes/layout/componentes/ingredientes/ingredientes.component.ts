import { Component, ViewChild } from '@angular/core';
import { TablaRegistrosService } from '../tabla-registros/services/tabla-registros.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent {

  constructor(
    private tabla_registro_service: TablaRegistrosService
  ){


  }


  tabla_columnas: string[] = [
    'ID',
    'Ingrediente',
    'Cantidad',
    'Unidades',
    'Fecha'
  ]

  tabla_datos: {
    id:number
    ingrediente: string,
    cantidad: number,
    unidades: string,
    fecha: string
  }[] = [

    {
      id: 10,
      ingrediente: 'Piña', 
      cantidad: 20,
      unidades: 'Gramos',
      fecha: '2020-05-06'
    },

    {
      id: 25,
      ingrediente: 'Gaseosa', 
      cantidad: 20,
      unidades: 'Litros',
      fecha: '2021-05-06'
    }

  ]



  campos_modal: {campo: string, tipo: string} [] = [

    {campo: 'Ingrediente', tipo: 'text'},

    {campo: 'Cantidad', tipo: 'number'},

    {campo: 'Unidades', tipo: 'text'},

    {campo: 'Fecha', tipo: 'date'}

  ] 

  ngOnInit(): void {
    

    this.tabla_registro_service.enviar_nombre_registro.emit('Ingrediente')
    this.tabla_registro_service.enviar_columnas.emit(this.tabla_columnas)
    this.tabla_registro_service.enviar_datos.emit(this.tabla_datos)
    this.tabla_registro_service.enviar_campos_modal.emit(this.campos_modal)
    
  
  }



}
