import { Routes } from '@angular/router';
import { NotfoundComponent } from './shared/notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'work',
    loadComponent: () =>
      import('./pages/work/work.component').then((m) => m.WorkComponent),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog.component').then((m) => m.BlogComponent),
  },
  {
    path: 'project',
    loadComponent: () =>
      import('./pages/project/project.component').then(
        (m) => m.ProjectComponent
      ),
  },
  {
    path: 'talk',
    loadComponent: () =>
      import('./pages/talk/talk.component').then((m) => m.TalkComponent),
  },
  {
    path: 'talk/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/talk/detail/detail.component').then(
        (m) => m.DetailComponent
      ),
  },
  {
    path: 'maudong',
    loadComponent: () =>
      import('./pages/affiliate/affiliate.component').then(
        (m) => m.AffiliateComponent
      ),
  },
  { path: '**', component: NotfoundComponent },
];
