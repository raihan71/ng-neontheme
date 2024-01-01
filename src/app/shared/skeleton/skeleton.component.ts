import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [
    NgxSkeletonLoaderModule
  ],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css'
})
export class SkeletonComponent {
  @Input() page: string = '';
  @Input() count: number = 3;
  @Input() width: string = '600px';

  constructor() {}
}
