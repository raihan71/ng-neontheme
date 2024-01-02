import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { GoogleAnalyticsGTagComponent } from './shared/gtm/gtm.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, GoogleAnalyticsGTagComponent],
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
