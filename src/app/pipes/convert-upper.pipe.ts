import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUpperPipe',
  standalone: true
})
export class ConvertUpperPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toUpperCase();
  }

}
