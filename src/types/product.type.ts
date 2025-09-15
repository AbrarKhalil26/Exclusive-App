import { IBrand } from "./brand.type"
import { ICategory } from "./category.type"
import { IPagination } from "./pagination.type"
import { ISubcategory } from "./subcategory.type"

export interface IProductResponse {
  results: number
  metadata: IPagination
  data: IProduct[]
}

export interface IProduct {
  sold?: number
  images: string[]
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: string[]
}