import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getGender'
})
export class GetGenderPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value){
      case 'M':
        return "Mâle";
      case 'F': 
        return "Femelle";
      default :
        return "Inconnu";
    };
  }

}
