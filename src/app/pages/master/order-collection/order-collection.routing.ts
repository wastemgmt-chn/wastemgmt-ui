import { Routes, RouterModule } from '@angular/router';
import { OrderCollectionComponent } from './order-collection.component';

const routes: Routes = [
  { path:'',component:OrderCollectionComponent },
];

export const OrderCollectionRoutes = RouterModule.forChild(routes);
