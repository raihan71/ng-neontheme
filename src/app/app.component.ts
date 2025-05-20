import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { inject } from '@vercel/analytics';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { GoogleAnalyticsGTagComponent } from './shared/ads/gtm/gtm.component';
import { environment } from '../environments/environment';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    GoogleAnalyticsGTagComponent,
  ],
  templateUrl: './app.component.html',
  styles: [
    `
      .back-to-top {
        position: fixed;
        bottom: 25px;
        right: 25px;
      }
    `,
  ],
})
export class AppComponent {
  title: string = 'ngsite-hacker';
  activateGoTop: boolean = false;
  skipLinkPath: string = '';
  constructor(private router: Router) {
    inject({
      mode: environment.production ? 'production' : 'development',
    });
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (!this.router.url.endsWith('#content')) {
          this.skipLinkPath = `${this.router.url}#content`;
        }
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 100) {
      this.activateGoTop = true;
    } else {
      this.activateGoTop = false;
    }
  }
  scrollToTop() {
    return window.scrollTo(0, 0);
  }
}
