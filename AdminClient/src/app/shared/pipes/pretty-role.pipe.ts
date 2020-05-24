import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyRole'
})
export class PrettyRolePipe implements PipeTransform {

  transform(value: string): string {
    const val = value.split('_')
                     .join(' ')
                     .toLocaleLowerCase()
                     .replace('role', '')
                     .trim();

    return val.charAt(0).toUpperCase() + val.slice(1);
  }

}
