import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "category",
    loadChildren: () =>
      import("../master/category/category.module").then((m) => m.CategoryModule),
  },
  {
    path: "seller-type",
    loadChildren: () =>
      import("../master/seller-type/seller-type.module").then((m) => m.SellerTypeModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("../master/user/user.module").then((m) => m.UserModule),
  },
  {
    path: "place-order",
    loadChildren: () =>
      import("../master/place-order/place-order.module").then((m) => m.PlaceOrderModule),

  },
  {
    path: "user-location",
    loadChildren: () =>
    import("../master/user-location/user-location.module").then((m) => m.UserLocationModule),
  },
  {
    path: "bid",
    loadChildren: () =>
    import("../master/bid/bid.module").then((m) => m.BidModule),
  },
];

export const MasterRoutes = RouterModule.forChild(routes);
