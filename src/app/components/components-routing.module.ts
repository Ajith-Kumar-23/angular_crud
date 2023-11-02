import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
        import('./authentication/authentication.module').then(
            mod => mod.AuthenticationModule
        )
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((mod) => mod.PagesModule),
      component:LayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
