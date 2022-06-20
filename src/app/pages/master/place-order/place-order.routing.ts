import { Routes, RouterModule } from '@angular/router';
import { PlaceOrderAddComponent } from './place-order-add/place-order-add.component';
import { PlaceOrderComponent } from './place-order.component';

const routes: Routes = [
  { path:'',component:PlaceOrderComponent },
  {
    path: "add",
    component: PlaceOrderAddComponent,
  },
  {
    path: "edit/:id",
    component: PlaceOrderAddComponent,
  },
];

export const PlaceOrderRoutes = RouterModule.forChild(routes);
