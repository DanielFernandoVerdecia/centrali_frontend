import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siNo'
})
export class SiNoPipe implements PipeTransform {

  transform(valor: boolean): string {
    return valor ? 'Sí': 'No';
  }

}
