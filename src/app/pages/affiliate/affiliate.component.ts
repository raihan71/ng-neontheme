import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-affiliate',
  standalone: true,
  imports: [],
  template: ``,
  styles: [``],
})
export class AffiliateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.location.href = 'https://poslte.my.id/fyi';
  }
}
