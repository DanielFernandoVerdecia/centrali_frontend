import { Pipe, PipeTransform } from '@angular/core';
import { FechaFormatoPipe } from '../fecha/fecha-formato.pipe';



@Pipe({
  name: 'fechaNull'
})
export class FechaNullPipe implements PipeTransform {

  transform(fecha_ingresada: null | string): string {

    return ''

  }

}
