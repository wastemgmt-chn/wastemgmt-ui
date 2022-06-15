import { Routes, RouterModule } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path:'',component:UserComponent },
  {
    path: "add",
    component: UserAddComponent,
  },
  {
    path: "edit/:id",
    component: UserAddComponent,
  },
];

export const UserRoutes = RouterModule.forChild(routes);
