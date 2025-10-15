import { ChangeDetectorRef, Component } from '@angular/core';
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
  imports: [SkeletonComponent, PipesModule, NgOptimizedImage],
  templateUrl: './work.component.html',
  styles: [
    `
      .card-work:hover {
        border-color: #006cff !important;
        box-shadow: 0 0 50px 15px #2983fe;
      }
    `,
  ],
})
export class WorkComponent {
  works: any = [];
  show: boolean = false;
  skeletons: any = [1, 2, 3, 4];
  limit: number = 6;
  skip: number = 0;
  currentPage: number = 1;

  constructor(
    private cs: ContentfulService,
    private meta: MetaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.meta.updateTitle(`Work - ${import.meta.env['NG_APP_NAME']}`);
    this.fetchWork();
  }

  fetchWork() {
    const params = {
      content_type: CONFIG.contentTypeIds.works,
      order: '-fields.startYear',
      limit: this.limit,
      skip: this.skip,
    };

    this.cs.getEntries(params).subscribe((works: any[]) => {
      if (works && works.length > 0) {
        const updatedWorksPromises = works.map((work: any) => {
          if (
            work.fields &&
            work.fields.logo &&
            work.fields.logo.sys &&
            work.fields.logo.sys.id
          ) {
            const logoSysId = work.fields.logo.sys.id;
            return this.cs
              .getSingleImg(logoSysId)
              .then((logoAsset: string | undefined) => {
                // Update the current work entry with the logoAsset
                return {
                  ...work,
                  logoAsset: logoAsset,
                };
              });
          }

          // If the entry doesn't have the necessary fields, return the original entry
          return work;
        });

        // Wait for all promises to resolve
        Promise.all(updatedWorksPromises).then((updatedWorks) => {
          this.works = updatedWorks.sort((a, b) => {
            const isResignedA = !!a?.fields?.isResigned;
            const isResignedB = !!b?.fields?.isResigned;

            if (isResignedA !== isResignedB) {
              return isResignedA ? 1 : -1;
            }

            const endYearA = a?.fields?.endYear ?? 0;
            const endYearB = b?.fields?.endYear ?? 0;

            if (endYearA !== endYearB) {
              return endYearB - endYearA;
            }

            const startYearA = a?.fields?.startYear ?? 0;
            const startYearB = b?.fields?.startYear ?? 0;

            return startYearB - startYearA;
          });
          setInterval(() => {
            this.show = true;
            this.cdr.detectChanges();
          }, 100);
        });
      }
    });
  }

  nextPage() {
    this.skip += this.limit;
    this.currentPage++;
    this.fetchWork();
  }

  previousPage() {
    this.skip -= this.limit;
    if (this.skip < 0) {
      this.skip = 0;
    }
    this.currentPage--;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    this.fetchWork();
  }
}
