import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ContentfulService } from '../../services/contentful.service';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';
import { PipesModule } from '../../pipes/pipes.module';
import { environment } from '../../../environments/environment';
import { MetaService } from '../../services/metaseo.service';
const CONFIG = environment.contentful_config;
@Component({
  selector: 'app-work',
  standalone: true,
  imports: [SkeletonComponent,PipesModule,NgOptimizedImage],
  templateUrl: './work.component.html',
  styles: [
    `.card-work:hover {
      border-color: #006cff!important;
      box-shadow: 0 0 50px 15px #2983fe;
    }`
  ]
})
export class WorkComponent {
  works:any = [];
  show: boolean = false;
  skeletons:any = [1,2,3,4];

  constructor(private cs: ContentfulService, private meta: MetaService) {}

  ngOnInit(): void {
    this.meta.updateTitle(`Work - ${import.meta.env['NG_APP_NAME']}`);
    this.cs.getEntries({content_type: CONFIG.contentTypeIds.works}).subscribe((works:any[]) => {
      if (works && works.length > 0) {
        const updatedWorksPromises = works.map((work: any) => {
          if (work.fields && work.fields.logo && work.fields.logo.sys && work.fields.logo.sys.id) {
            const logoSysId = work.fields.logo.sys.id;

            return this.cs.getSingleImg(logoSysId).then((logoAsset: string | undefined) => {

              // Update the current work entry with the logoAsset
              return {
                ...work,
                logoAsset: logoAsset
              };
            });
          }

          // If the entry doesn't have the necessary fields, return the original entry
          return work;
        });

        // Wait for all promises to resolve
        Promise.all(updatedWorksPromises).then((updatedWorks) => {
          this.works = updatedWorks.sort((a, b) => (a.fields.isResigned === b.fields.isResigned) ? 0 : a.fields.isResigned ? 1 : -1);
          setTimeout(() => {
            this.show = true;
          }, 350);
        });
      }
    });

  }

}
