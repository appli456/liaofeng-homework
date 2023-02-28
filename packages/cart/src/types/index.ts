import {SerializableParam} from "recoil";

export interface ProductData {
  createdAt: string;
  currency: string;
  currencySymbol: string;
  id: string;
  image: string;
  name: string;
  price: string;
}

export interface CartData extends ProductData {
  quantity: number;
}

export type ProductQuery = {
  sortBy?: 'price' | 'popularity' | 'sales',
  size?: string,
}


