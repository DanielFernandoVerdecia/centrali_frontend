import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isActive'
})
export class IsActivePipe implements PipeTransform {

  transform(is_active: boolean): string {

    return is_active ? 'Cuenta verificada' : 'Cuenta NO verificada';

  }

}
