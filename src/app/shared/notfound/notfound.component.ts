import { Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [],
  templateUrl: './notfound.component.html',
  styles: [`.error-template {padding: 40px 15px;text-align: center;}
  .error-actions {margin-top:15px;margin-bottom:15px;}
  .error-actions .btn { margin-right:10px; }
`]
})
export class NotfoundComponent {

}
