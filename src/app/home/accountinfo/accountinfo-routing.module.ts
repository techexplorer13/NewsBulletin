import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountinfoPage } from './accountinfo.page';
import { AuthGuard} from '../guard/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: AccountinfoPage,
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountinfoPageRoutingModule {}
