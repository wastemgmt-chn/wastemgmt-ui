export const navItems = [
  {
    title: "Dashboard",
    id: "dashboard",
    activeIcon: "assets/images/icons/dashboard-white-ico.png",
    icon: "assets/images/icons/dashboard-ico.png",
    link: "/dashboard",
    child: null
  },
  {
    title: "Master Data",
    id: "master-data",
    activeIcon: "assets/images/icons/masterdata-white-ico.png",
    icon: "assets/images/icons/masterdata-ico.png",
    child: [
      {
        title: "Season",
        link: "/master/season",
      },
      {
        title: "Crop",
        link: "/master/crop",
      },
      {
        title: "Farm Input",
        link: "/master/farm-input",
      },
      {
        title: "Farmer",
        link: "/master/farmer",
      },
      {
        title: "Vendor",
        link: "/master/vendors",
      },
      {
        title: "Buyers",
        link: "/master/buyer",
      },
      {
        title: "Warehouse",
        link: "/master/warehouse",
      },
      {
        title: "Catalogue",
        link: "/master/catalogue",
      },
      {
        title: "Training",
        link: "/master/training",
      },
      {
        title: "Location",
        link: "/master/location"
      }
    ]
  },
  {
    title: "Settings",
    id: "settings-data",
    activeIcon: "assets/images/icons/profile-white-ico.png",
    icon: "assets/images/icons/profile-ico.png",
    child: [
      {
        title: "Group",
        link: "/settings/group",
      },
      {
        title: "Mobile User",
        link: "/settings/mobile-user",
      },
      {
        title: "Device",
        link: "/settings/device",
      },
      {
        title: "User",
        link: "/settings/user",
      },
      {
        title: "Role",
        link: "/settings/role",
      },
      {
        title: "Settings",
        link: "/settings/setting",
      },
      {
        title: "Organization",
        link: "/settings/organization",
      },
    ]
  }
];
export const navProdItems = [
  {
    title: "Dashboard",
    id: "dashboard",
    activeIcon: "assets/images/icons/dashboard-white-ico.png",
    icon: "assets/images/icons/dashboard-ico.png",
    link: "/dashboard"
  },
  {
    title: "Master Data",
    id: "master-data",
    activeIcon: "assets/images/icons/masterdata-white-ico.png",
    icon: "assets/images/icons/masterdata-ico.png",
    child: [
      {
        title: "Season",
        link: "/master/season",
      },
      {
        title: "Crop",
        link: "/master/crop",
      },
      {
        title: "Farm Input",
        link: "/master/farm-input",
      },
      {
        title: "Vendor",
        link: "/master/vendors",
      },
      {
        title: "Buyers",
        link: "/master/buyer",
      },
      {
        title: "Warehouse",
        link: "/master/warehouse",
      },
      {
        title: "Catalogue",
        link: "/master/catalogue",
      },
      {
        title: "Location",
        link: "/master/location"
      },
      {
        title: "Training",
        link: "/master/training",
      }
    ]
  },
  {
    title: "Inventory",
    id: "inventory-data",
    activeIcon: "assets/images/icons/inventory-white-ico.png",
    icon: "assets/images/icons/inventory-ico.png",
    child: [
      {
        title: "Warehouse Stock Entry",
        link: "/inventory/warehouse-stock",
      },
      {
        title: "Distribution To MobileUser",
        link: "/inventory/distribution-to-mobile-user",
      },
      {
        title: "Distribution To Farmer",
        link: "/inventory/distribution-to-farmer",
      },
      {
        title: "Product Return MobileUser",
        link: "/inventory/product-return-mobile-user",
      },
      {
        title: "Distribution Transfer",
        link: "/inventory/distribution-stock-transfer",
      },
      {
        title: "Distribution Reception",
        link: "/inventory/distribution-stock-reception",
      },
      {
        title: "Product Return Farmer",
        link: "/inventory/product-return-farmer",
      },
      {
        title: "Loan Disbursement",
        link: "/inventory/loan-disbursement",
      },
    ]
  },
  {
    title: "Procurement",
    id: "procurement-data",
    activeIcon: "assets/images/icons/procurement-white-ico.png",
    icon: "assets/images/icons/procurement-ico.png",
    child: [
      {
        title: "Procurement",
        link: "/procurement/procurement",
      },
      {
        title: "Product Transfer",
        link: "/procurement/product-transfer",
      },
      {
        title: "Product Reception",
        link: "/procurement/product-reception",
      },
      {
        title: "Crop Sale",
        link: "/procurement/crop-sale",
      },
      {
        title: "Crop Harvest",
        link: "/procurement/crop-harvest",
      },

    ]
  },
  {
    title: "Reports",
    id: "report-data",
    activeIcon: "assets/images/icons/reports-white-ico.png",
    icon: "assets/images/icons/reports-ico.png",
    child: [
      {
        title: "Warehouse Stock Report",
        link: "/report/Warehouse_stock_Report",
      },
      {
        title: "Procurement Stock Report",
        link: "/report/Procurement_stock_Report",
      },
    ]
  },
  {
    title: "Settings",
    id: "settings-data",
    activeIcon: "assets/images/icons/profile-white-ico.png",
    icon: "assets/images/icons/profile-ico.png",
    child: [
      {
        title: "Group",
        link: "/settings/group",
      },
      {
        title: "Mobile User",
        link: "/settings/mobile-user",
      },
      {
        title: "Device",
        link: "/settings/device",
      },
      {
        title: "User",
        link: "/settings/user",
      },
      {
        title: "Role",
        link: "/settings/role",
      },
      {
        title: "Settings",
        link: "/settings/setting",
      },
      {
        title: "Organization",
        link: "/settings/organization",
      },

    ]
  },
  {
    title: "Farmer",
    id: "farmer-data",
    activeIcon: "assets/images/icons/farmer-white-ico.png",
    icon: "assets/images/icons/farmer-ico.png",
    child: [
      {
        title: "Farmer",
        link: "/report/farmer",
      },
      {
        title: "Farmer Location",
        link: "/farmer/farm-location",
      },
       {
         title: "Procurement",
         link: "/report/procurement",
       },
       {
        title: "Product Transfer",
        link: "/report/product_transfer",
      },
      {
        title: "Product Reception",
        link: "/report/product_reception",
      },
       {
         title: "Warehouse Stock Entry",
         link: "/report/warehouse_stock_entry",
       },
       {
         title: "Distribution to farmer",
         link: "/transaction/farmerDistribution",
       },
       {
        title: "Crop Sale",
        link: "/report/crop_sale",
      },
       {
         title: "Crop Harvest",
         link: "/report/crop_harvest",
       }
    ]
  }
]
