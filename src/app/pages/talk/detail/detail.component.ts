import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HttpService } from './../../../services/http.service';
import { SkeletonComponent } from '../../../shared/skeleton/skeleton.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { ContentfulService } from '../../../services/contentful.service';
import { service } from '../../../constant/service';
import { BreadcrumbComponent } from "../../../shared/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-talk-detail',
  standalone: true,
  imports: [SkeletonComponent, PipesModule, BreadcrumbComponent],
  templateUrl: './detail.component.html',
  styles: [`.mt-80 { margin-top: 80px;}`]
})
export class DetailComponent {
  show:boolean = false;
  private readonly title = inject(Title);
  private readonly metaTag = inject(Meta);
  breadcrumb:any[] = [
    {label: 'Home', url: '/'},
    {label: 'Talks', url: '/talk'},
    {label: 'Detail', url: ''}
  ]
  talk:any = {};
  quote:any = {};

  constructor(
      private cs: ContentfulService,
      private route: ActivatedRoute,
      private httpService: HttpService,
      private cdr: ChangeDetectorRef
    ){}

  ngOnInit(): void {
    const entry$ = this.cs.getEntry(this.route.snapshot.paramMap.get('id'));
    const quote$ = this.httpService.get(service.randomQuote);
    forkJoin({
      entry: entry$,
      quote: quote$
    }).subscribe({
      next: ({ entry, quote }) => {
        this.title.setTitle(`${entry['title']} - Talk by ${import.meta.env['NG_APP_NAME']}`);
        this.metaTag.updateTag({ name: 'description', content: `${entry['shortDesc']}` });
        this.metaTag.updateTag({ name: 'og:title', content: `${entry['title']} - Talk by ${import.meta.env['NG_APP_NAME']}` });
        this.metaTag.updateTag({ name: 'og:description', content: `${entry['shortDesc']}` });
        this.metaTag.updateTag({ name: 'og:url', content: `${window.location.href}` });
        this.talk = entry;
        this.quote = quote;

        setInterval(() => {
          this.show = true;
          this.cdr.detectChanges();
        }, 100);

      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
