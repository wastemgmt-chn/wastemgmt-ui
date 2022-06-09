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
];

export const MasterRoutes = RouterModule.forChild(routes);
