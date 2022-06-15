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
}
