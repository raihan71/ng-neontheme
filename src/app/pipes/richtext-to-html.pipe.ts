import { Pipe, PipeTransform } from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Document } from '@contentful/rich-text-types';
@Pipe({
  name: 'toHtml'
})
export class ToHtmlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields } } }:any) =>
          `
            <div class="row">
              <div class="col-12 py-2">
                <img class="img-fluid d-block" src="${fields.file.url}" alt="${fields.description}"/>
              </div>
            </div>
          `,
      },
    };
    return documentToHtmlString(value as Document, options);
  }
}
