import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';
import { PipesModule } from '../../pipes/pipes.module';
import { ContentfulService } from '../../services/contentful.service';
import { environment } from '../../../environments/environment';
import { MetaService } from '../../services/metaseo.service';
const CONFIG = environment.contentful_config;
@Component({
  selector: 'app-talk',
  standalone: true,
  imports: [SkeletonComponent, PipesModule, NgOptimizedImage, RouterLink],
  templateUrl: './talk.component.html',
})
export class TalkComponent {
  talks:any = [];
  show:boolean = false;

  constructor(private cs: ContentfulService, private meta: MetaService) {}

  ngOnInit(): void {
    this.meta.updateTitle(`Talk - ${import.meta.env['NG_APP_NAME']}`);
    this.cs.getEntries({content_type: CONFIG.contentTypeIds.talks}).subscribe({
    next: (entries) => {
      if (entries.length > 0) {
        this.talks = entries;
      }
      setTimeout(() => {
        this.show = true;
      }, 350);
    }});

  }
}
