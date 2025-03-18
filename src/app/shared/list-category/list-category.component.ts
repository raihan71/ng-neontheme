import { Component, Input } from '@angular/core';

@Component({
  selector: 'list-category',
  standalone: true,
  imports: [],
  templateUrl: './list-category.component.html',
})
export class ListCategoryComponent {
  @Input() title: string = '';
  @Input() slug: string = '';
  @Input() color: string = '';

  constructor() {}

  handlePress(params: any) {
    alert(params);
  }
}
