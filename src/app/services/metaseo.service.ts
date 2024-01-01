import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    private titleService: Title
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  updateTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  updateMetaTag(tagName: string, tagValue: any): void {
    const head = document?.head;
    let existingTag = this.getTag(tagName);

    if (!existingTag) {
      existingTag = this.renderer.createElement('meta');
      this.renderer.setAttribute(existingTag, 'name', tagName);
      this.renderer.appendChild(head, existingTag);
    }

    this.renderer.setAttribute(existingTag, 'content', tagValue);
  }

  private getTag(tagName: string): HTMLMetaElement | null {
    const head = document?.head;
    const tags = head.querySelectorAll(`meta[name="${tagName}"]`);
    return tags.length ? tags[0] as HTMLMetaElement : null;
  }
}
