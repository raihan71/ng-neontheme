import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';
import { PipesModule } from '../../pipes/pipes.module';
import { ContentfulService } from '../../services/contentful.service';
import { environment } from '../../../environments/environment';
import { MetaService } from '../../services/metaseo.service';
const CONFIG = environment.contentful_config;
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [SkeletonComponent, PipesModule, NgOptimizedImage],
  templateUrl: './project.component.html',
  styles: [
    `.card-project:hover {
      border-color: #5e32e0!important;
      box-shadow: 0 0 50px 15px #714cdf;
    }
    `
  ]
})
export class ProjectComponent {
  projects:any = [];
  show: boolean = false;
  skeletons:any = [1,2,3,4];
  constructor(private cs: ContentfulService, private meta: MetaService) {}
  ngOnInit(): void {
    this.meta.updateTitle(`Project - ${import.meta.env['NG_APP_NAME']}`);
    this.cs.getEntries({content_type: CONFIG.contentTypeIds.projects}).subscribe((projects:any[]) => {
      if (projects && projects.length > 0) {
        const updatedProjectsPromises = projects.map((project: any) => {
          if (project.fields && project.fields.logo && project.fields.logo.sys && project.fields.logo.sys.id) {
            const logoSysId = project.fields.logo.sys.id;

            return this.cs.getSingleImg(logoSysId).then((logoAsset: string | undefined) => {
              // Update the current project entry with the logoAsset
              return {
                ...project,
                logoAsset: logoAsset
              };
            });
          }

          // If the entry doesn't have the necessary fields, return the original entry
          return project;
        });

        // Wait for all promises to resolve
        Promise.all(updatedProjectsPromises).then((updatedProjects) => {
          this.projects = updatedProjects;
          setTimeout(() => {
            this.show = true;
          }, 100);
        });

      }
    });
  }
}
