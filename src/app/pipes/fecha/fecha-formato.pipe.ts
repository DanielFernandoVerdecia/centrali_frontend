import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFormato'
})
export class FechaFormatoPipe implements PipeTransform {

  transform(fecha_ingresada: string ): string{

    if (fecha_ingresada == null){

      return 'No se encontró fecha'

    }

    else {

      const fecha = new Date(fecha_ingresada);

      const dias_semana = [
        'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
      ];

      const meses_year = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
      ];

     
      const fecha_string = fecha.toLocaleDateString().split("/")
      const dia = fecha_string[0].padStart(2, '0')
      const mes = meses_year[ Number(fecha_string[1]) - 1]
      const year = fecha_string[2]
      
      const tiempo_string = fecha.toLocaleTimeString().split(":")
      const hora = tiempo_string[0].padStart(2, '0')
      const minutos = tiempo_string[1].padStart(2, '0')
      const am_pm = tiempo_string[2].split(' ')[1].toLocaleUpperCase()

      const fecha_obtenida = dia + ' de ' + mes + ' de ' + year + ', a las ' + hora + ':' + minutos + ' ' + am_pm

      return fecha_obtenida

    }
    

    
    

  }

}
