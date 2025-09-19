import { IBrand } from "./brand.type"
import { ICategory } from "./category.type"
import { ISubcategory } from "./subcategory.type"

export interface IAllOrdersRoot {
  data: IAllOrdersResponse;
  success: boolean;
  message: string | null;
}
export interface IAllOrdersResponse {
  results: number
  metadata: Metadata
  data: IAllOrders[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface IAllOrders {
  shippingAddress?: IShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: IUser
  cartItems: ICartItem[]
  createdAt: string
  updatedAt: string
  id: number
  paidAt?: string
}

export interface IShippingAddress {
  details: string
  city: string
  phone: string
}

export interface IUser {
  _id: string
  name: string
  email: string
  phone: string
}

export interface ICartItem {
  count: number
  _id: string
  product?: Product
  price?: number
}

export interface Product {
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  id: string
}