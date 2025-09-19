import { IBrand } from "./brand.type";
import { ICategory } from "./category.type";
import { ISubcategory } from "./subcategory.type";

export interface ICartRoot {
  data: ICartResponse;
  success: boolean;
  message: string | null;
}

export interface ICartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: ICart;
}

export interface ICart {
  _id: string;
  _v: number;
  cartOwner: string;
  totalCartPrice: number;
  products: ICartProducts[];
  createdAt: string;
  updatedAt: string;
}

export interface ICartProducts {
  _id: string;
  count: number;
  price: number;
  product: ICartProductDetails;
}

export interface ICartProductDetails {
  _id: string;
  id: string;
  title: string;
  quantity: number;
  imageCover: string;
  ratingsAverage: number;
  category: ICategory;
  subCategory: ISubcategory;
  brand: IBrand;
}
