import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-adcash',
  template: '',
})
export class AdCashComponent implements OnInit {
  trackingCode = import.meta.env['NG_APP_ADCASH'] || '';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = `aclib.runAutoTag({ zoneId: ${this.trackingCode} });`;

    const head = document.getElementsByTagName('head')[0];
    this.renderer.appendChild(head, script);
  }
}
