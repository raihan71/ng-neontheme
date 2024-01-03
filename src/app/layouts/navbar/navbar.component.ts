import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styles: [".active { color: #96c5f3 !important; }"],
})
export class NavbarComponent {
  currentUrl: any = ''
  constructor(router: Router) {
      router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          if (e.url != '') {
            this.currentUrl = e.url;
          } else {
            this.currentUrl ='';
          }
        }
      });
    }
}
