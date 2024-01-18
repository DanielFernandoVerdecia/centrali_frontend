import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pesosColombianos'
})
export class PesosColombianosPipe implements PipeTransform {

  transform(dinero: number): string {


    if (isNaN(dinero)) {
      return 'SIN PRECIO';
    }

    const pesos_colombianos = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(dinero);

    return pesos_colombianos;
  }

}
