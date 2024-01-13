import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ContentfulService } from '../../services/contentful.service';
import { PipesModule } from '../../pipes/pipes.module';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';
import { environment } from '../../../environments/environment';
import { MetaService } from './../../services/metaseo.service';
const CONFIG = environment.contentful_config;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbPopoverModule, PipesModule, SkeletonComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  show:boolean = false;
  about:any = {};
  image:any = '';
  socials:any = [];
  currentWork: any = {};

  constructor(private cs: ContentfulService, private meta:MetaService) {}
  ngOnInit() {
    this.meta.updateTitle(`Home - ${import.meta.env['NG_APP_NAME']}`);
    forkJoin({
      aboutMe: this.cs.getEntry(import.meta.env['NG_APP_ABOUTME']),
      socials: from(this.cs.getEntries({content_type: CONFIG.contentTypeIds.socials})),
      works: from(this.cs.getEntries({
        content_type: CONFIG.contentTypeIds.works,
        'fields.isResigned': false
      }))
    })
      .pipe(
        mergeMap(({ aboutMe, socials, works }) => {
          this.about = aboutMe;
          this.socials = socials;
          this.currentWork = works[0]?.fields;

          const { avatar } = this.about;

          return from(this.cs.getSingleImg(avatar?.sys?.id)); // Convert Promise to Observable
        })
      )
      .subscribe(asset => {
        this.image = asset;
        this.meta.updateMetaTag('og:image', asset);
        setTimeout(() => {
          this.show = true;
        }, 100);
      });
  }
}
