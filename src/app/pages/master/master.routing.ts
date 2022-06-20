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
    path: "order-collection",
    loadChildren: () =>
      import("../master/order-collection/order-collection.module").then((m) => m.OrderCollectionModule),
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
];

export const MasterRoutes = RouterModule.forChild(routes);
