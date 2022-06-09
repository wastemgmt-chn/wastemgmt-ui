import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Master',
    icon: 'shopping-bag-outline',
    children: [
      {
        title: "Category",
        link: "/pages/master/category",
      },
      {
        title: "Seller Type",
        link: "/pages/master/seller-type",
      },
      {
        title: "User",
        link: "/pages/master/user",
      },
    ],
  },
];
