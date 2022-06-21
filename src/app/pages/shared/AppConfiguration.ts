import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
// import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppConfiguration {


  successIconUrl = "assets/images/icons/modal-success-ico.png"
  failureIconUrl = "assets/images/icons/modal-failure-ico.png"

  baseUrl = environment.baseURL;

  //Login
  login = "user/user/login"

  //UploadFile
  uploadFile = "master/uploads/file"

  //Menu
  getMenus = "user/menu"

  //getMenu
  getMenu = "user/menu"

  //getFarmerMenu
  getFarmerMenu = "report/dynamic/page?id="
  saveFarmerDetails = "report/dynamic/save"
  FarmerLocationAggregate = "report/dashbaord/farmer"
  getFarmerDetailInLocationPage = "report/config/farmer-detail?id="

  //Dowloads
  downloadPdf = "/report/download-pdf?report=";
  downloadExcel = "/report/download-excel?report=";

  //SubCategory
  saveSubCategory = "/subcategory/save";
  getAllSubCategories = "/subcategory/subcategories";
  getSubCategoryById = "/subcategory/by-id?id=";
  getSubCategories = "/subcategory";
  deleteSubCategoryById = "/subcategory/delete?id=";

  //Product]
  saveProduct = "/product/save";
  getAllProducts = "/product/products";
  getProductById = "/product/by-id?id=";
  getProducts = "/product";
  deleteProductById = "/product/delete?id=";

  //SellerType
  saveSeller="/sellerType/save";
  getAllSellers="/sellerType/sellertypes";
  getSellerById="/sellerType/by-id?id=";
  getSellers="/sellerType";
  deleteSeller="/sellerType/delete?id=";

  //User
  getAllUsers="/user/users";
  getUsers="/user";
  getUserById="/user/by-id?id=";
  saveUser="/user/save";
  getUserCount="/user/get-count";

  //roles
  getRoles="/role/roles";

   //OrderCollection
   getOrderCollections="/order-collection";
   getOrderCollectionById="/order-collection/by-id?id=";
   saveOrderCollection="/order-collection/save";
   getTransactionStatus="/transaction-status/transactions";
  //address

  getDashBoardCharts = "configuration/dashboard/charts";

  //productBid
  getBids="/order-collection/getProduct-bid";
  getBidById="/order-collection/by-bid-id?id=";
  saveBid="/order-collection/save-order-collection-product-bid";
  getBidsByOrderId="/order-collection/get-bids-by-order?id=";



  //address
  deleteUserAddress='/useraddress/delete-address?id=';
  getAllUserAddress="/useraddress/userAddresses";

}
