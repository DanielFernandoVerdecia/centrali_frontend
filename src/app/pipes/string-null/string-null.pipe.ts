import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringNull'
})
export class StringNullPipe implements PipeTransform {

  transform(value: string): string {
    


    return 'Nulo';


  

    
  }

}
