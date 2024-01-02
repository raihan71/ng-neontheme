import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { inject } from '@vercel/analytics';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { GoogleAnalyticsGTagComponent } from './shared/gtm/gtm.component';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, NavbarComponent,
    FooterComponent, GoogleAnalyticsGTagComponent
  ],
  templateUrl: './app.component.html',
  styles: [`
    .back-to-top {
        position: fixed;
        bottom: 25px;
        right: 25px;
    }
  `]
})
export class AppComponent {
  title:string = 'ngsite-hacker';
  activateGoTop:boolean = false;

  constructor(private meta: Meta){
    inject({
      mode: environment.production ? 'production' : 'development',
    });
    this.meta.addTag({ name: 'google-site-verification', content: `${import.meta.env['NG_APP_GSEARCH'] || ''}` });
  }

  @HostListener('window:scroll',[])
  onWindowScroll() {
    if ( window.scrollY > 100 ) {
      this.activateGoTop = true;
    } else {
      this.activateGoTop = false;
    }
  }
  scrollToTop() {
      return window.scrollTo(0, 0);
  }
}
