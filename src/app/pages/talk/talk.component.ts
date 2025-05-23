import { Component, ChangeDetectorRef } from '@angular/core';
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

  constructor(private cs: ContentfulService, private meta: MetaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const params = {
      content_type: CONFIG.contentTypeIds.talks,
      order: '-fields.dateEvent'
    };
    this.meta.updateTitle(`Talk - ${import.meta.env['NG_APP_NAME']}`);
    this.cs.getEntries(params).subscribe({
    next: (entries) => {
      if (entries.length > 0) {
        this.talks = entries;
      }
      setInterval(() => {
        this.show = true;
        this.cdr.detectChanges();
      }, 100);
    }});

  }
}
