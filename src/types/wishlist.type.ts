import { IProduct } from "./product.type";

export interface IWishlist {
  status: string;
  count: number;
  data: IProduct[];
}
