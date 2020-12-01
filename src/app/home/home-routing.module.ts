import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'news',
      loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
      },
      {
        path:'accountinfo',
        loadChildren: () => import('./accountinfo/accountinfo.module').then( m => m.AccountinfoPageModule),
        canActivate:[AuthGuard]
      },
      {
        path:'headlines',
        loadChildren: () => import('./headlines/headlines.module').then( m => m.HeadlinesPageModule)
      },
      {
        path:'',
        redirectTo:'headlines'
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'magazine',
        loadChildren: () => import('./magazine/magazine.module').then( m => m.MagazinePageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
