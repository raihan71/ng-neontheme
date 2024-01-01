import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { PipesModule } from '../../pipes/pipes.module';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';
import { MetaService } from '../../services/metaseo.service';
import { service } from '../../constant/service';

const CONFIG = environment;

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [PipesModule, SkeletonComponent],
  templateUrl: './blog.component.html',
  styles: [
    `.card-blog:hover {
      border-color: #252640!important;
      box-shadow: 0 0 50px 15px #28293e!important;
    }`
  ]
})
export class BlogComponent {
  blogs:any = [];
  show:boolean = false;
  skeletons:any = [1,2,3,4];
  constructor(private httpService: HttpService, private meta: MetaService) { }

  ngOnInit(): void {
    this.meta.updateTitle(`Blog - ${import.meta.env['NG_APP_NAME']}`);
    this.httpService.get(service.mediumBlog).subscribe(
      {next: (resp: any) => {
        this.blogs = resp?.items;
        setTimeout(() => {
          this.show = true;
        }, 350);
    }, error(err) {
      console.error(err);
    }});
  }
}
