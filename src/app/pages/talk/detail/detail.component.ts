import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HttpService } from './../../../services/http.service';
import { SkeletonComponent } from '../../../shared/skeleton/skeleton.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { ContentfulService } from '../../../services/contentful.service';
import { environment } from '../../../../environments/environment';
import { service } from '../../../constant/service';
import { MetaService } from '../../../services/metaseo.service';
const CONFIG = environment.contentful_config;
@Component({
  selector: 'app-talk-detail',
  standalone: true,
  imports: [SkeletonComponent, PipesModule],
  templateUrl: './detail.component.html',
  styles: [`.mt-100 { margin-top: 100px;}`]
})
export class DetailComponent {
  show:boolean = false;
  talk:any = {};
  quote:any = {};

  constructor(
      private cs: ContentfulService,
      private route: ActivatedRoute,
      private httpService: HttpService,
      private meta: MetaService
    ){}

  ngOnInit(): void {
    // Create an observable for each HTTP request
    const entry$ = this.cs.getEntry(this.route.snapshot.paramMap.get('id'));
    const quote$ = this.httpService.get(service.randomQuote);

    // Use forkJoin to combine the observables and wait for both to complete
    forkJoin({
      entry: entry$,
      quote: quote$
    }).subscribe({
      next: ({ entry, quote }) => {
        this.meta.updateTitle(`${entry['title']} - Talk by ${import.meta.env['NG_APP_NAME']}`);
        this.meta.updateMetaTag('og:title', entry['title']);
        this.talk = entry;
        this.quote = quote;

        setTimeout(() => {
          this.show = true;
        }, 350);

      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
