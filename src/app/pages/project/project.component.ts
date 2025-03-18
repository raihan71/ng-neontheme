import { ChangeDetectorRef, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';
import { PipesModule } from '../../pipes/pipes.module';
import { ContentfulService } from '../../services/contentful.service';
import { environment } from '../../../environments/environment';
import { MetaService } from '../../services/metaseo.service';
import { ListCategoryComponent } from '../../shared/list-category/list-category.component';

const CONFIG = environment.contentful_config;
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    SkeletonComponent,
    PipesModule,
    NgOptimizedImage,
    ListCategoryComponent,
  ],
  templateUrl: './project.component.html',
  styles: [
    `
      .card-project:hover {
        border-color: #5e32e0 !important;
        box-shadow: 0 0 50px 15px #714cdf;
      }
    `,
  ],
})
export class ProjectComponent {
  projects: any = [];
  show: boolean = false;
  skeletons: any = [1, 2, 3, 4];
  limit: number = 6;
  skip: number = 0;
  currentPage: number = 1;
  category: any;

  constructor(
    private cs: ContentfulService,
    private meta: MetaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.meta.updateTitle(`Project - ${import.meta.env['NG_APP_NAME']}`);
    this.fetchProject();
    this.category = [
      {
        title: 'All Projects',
        slug: 'all',
        color: 'primary',
      },
      {
        title: 'Web Development',
        slug: 'web-development',
        color: 'success',
      },
      {
        title: 'Mobile Development',
        slug: 'mobile-development',
        color: 'warning',
      },
    ];
  }

  fetchProject() {
    const params = {
      content_type: CONFIG.contentTypeIds.projects,
      limit: this.limit,
      skip: this.skip,
    };

    this.cs.getEntries(params).subscribe((projects: any[]) => {
      if (projects && projects.length > 0) {
        const updatedProjectsPromises = projects.map((project: any) => {
          if (
            project.fields &&
            project.fields.logo &&
            project.fields.logo.sys &&
            project.fields.logo.sys.id
          ) {
            const logoSysId = project.fields.logo.sys.id;

            return this.cs
              .getSingleImg(logoSysId)
              .then((logoAsset: string | undefined) => {
                // Update the current project entry with the logoAsset
                return {
                  ...project,
                  logoAsset: logoAsset,
                };
              });
          }

          return project;
        });

        // Wait for all promises to resolve
        Promise.all(updatedProjectsPromises).then((updatedProjects) => {
          this.projects = updatedProjects;
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
    this.fetchProject();
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
    this.fetchProject();
  }
}
