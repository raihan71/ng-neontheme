import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlToPlaintext'
})
export class htmlToPlaintextPipe implements PipeTransform {
  transform(value: string): string {
    if (typeof window !== 'undefined') {
      const div = window.document.createElement('div');
      div.innerHTML = value;
      return div.textContent || div.innerText || '';
    } else {
      return value.replace(/<[^>]*>/g, '');
    }
  }
}
