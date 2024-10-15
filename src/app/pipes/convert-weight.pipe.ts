import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertWeight',
  standalone: true
})
export class ConvertWeightPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value * 1000;
  }

}
