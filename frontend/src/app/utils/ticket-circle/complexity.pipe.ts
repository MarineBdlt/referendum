import {
  Pipe,
  PipeTransform
} from '@angular/core';


@Pipe({
  name: 'complexityCircle'
})

export class ComplexityPipe implements PipeTransform {

  transform(value: any, replaceText: string = 'NR'): any {
    if (typeof value === 'undefined' || value === null || value === 0) {
      return replaceText
    }
    return value;
  }
}
