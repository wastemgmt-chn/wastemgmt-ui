import { Routes, RouterModule } from '@angular/router';
import { SellerTypeComponent } from './seller-type.component';

const routes: Routes = [
  { path:'',component:SellerTypeComponent },
];

export const SellerRoutes = RouterModule.forChild(routes);
