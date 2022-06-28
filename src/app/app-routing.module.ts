import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
} from '@nebular/auth';
import { AdminGuard } from './pages/admin-guard/admin.guard';
import { AuthGuard } from './pages/guard/auth.guard.ts.service';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [

      {
        path: "",
        loadChildren: () =>
          import("./login/login.module").then((m) => m.LoginModule),
        }
    ],
  },
  {
    path: '', redirectTo: 'pages',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'pages' },
]
const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
