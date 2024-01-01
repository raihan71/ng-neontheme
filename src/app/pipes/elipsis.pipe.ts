import { Pipe, PipeTransform } from '@angular/core';
/**
 * Strips any html characters
 * from the `target`, abbreviates the resulting string
 * to the max length, and appends an ellipsis character
 * to the result.
 *
 * @example
 * {{ title | ellipsis:200 }}
 */
@Pipe({ name: 'ellipsis' })
export class EllipsisPipe implements PipeTransform {
  transform(target: string, maxLength: number = 180) {
    const htmlStripped = target?.replace(/(<([^>]+)>)/gi, '');

    if (htmlStripped?.length >= maxLength) {
      return `${htmlStripped.slice(0, maxLength)}...`;
    }
    return htmlStripped;
  }
}
