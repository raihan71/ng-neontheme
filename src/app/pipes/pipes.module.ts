import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ToHtmlPipe } from './richtext-to-html.pipe';
import { SanitizedHtmlPipe } from './sanitized-html.pipe';
import { EllipsisPipe } from './elipsis.pipe';
import { htmlToPlaintextPipe } from './html-to-text.pipe';

@NgModule({
  declarations: [ToHtmlPipe, SanitizedHtmlPipe, EllipsisPipe, htmlToPlaintextPipe],
  imports: [
    CommonModule
  ],
  exports: [ToHtmlPipe, SanitizedHtmlPipe, EllipsisPipe, DatePipe, htmlToPlaintextPipe],
})
export class PipesModule { }
