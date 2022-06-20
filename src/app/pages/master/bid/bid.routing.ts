import { Routes, RouterModule } from '@angular/router';
import { BidAddComponent } from './bid-add/bid-add.component';
import { BidComponent } from './bid.component';

const routes: Routes = [
  {path:'',component:BidComponent  },
  {
    path: "add",
    component: BidAddComponent,
  },
  {
    path: "edit/:id",
    component: BidAddComponent,
  },
];

export const BidRoutes = RouterModule.forChild(routes);
