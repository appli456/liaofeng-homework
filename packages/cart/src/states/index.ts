import {
  atom,
  selector,
  selectorFamily,
} from 'recoil';
import axios from "axios";
import {
  addProducts,
  deleteProducts,
  divideArray,
  updateProducts,
} from "../utils";

import {
  CartData,
  ProductData
} from "../types";

export const productDataSelector = selector<ProductData[]>({
  key: 'product-data-selector',
  get: async ({ get }) => {
    const response = await axios.get('https://63ef1aa7271439b7fe683af3.mockapi.io/products');
    const json = response.data;
    if (Array.isArray(json)) {
      return json;
    }

    return [];
  }
});

export const showProductData = selector<ProductData[][]>({
  key: 'show-product-data',
  get: ({ get }) => {
    const productData = get(productDataSelector);

    return divideArray(productData, 4);
  }
});

export type MethodPayload = {
  [K in keyof CartData]: CartData[K]
}

type CartAction = 'delete' | 'update' | 'read' | 'search' | 'add';
export type CartPayload = MethodPayload | null | MethodPayload[];


export const cartProductsData = atom<CartData[]>({
  key: 'cart-product-data',
  default: [],
})

export const cartProducts = selectorFamily<CartPayload, CartAction>({
  key: 'cart-products',
  get: () => ({ get }) => {
    return get(cartProductsData)
  },

  set: (action: CartAction) => ({ get, set }, payload) => {
    const products = get(cartProductsData);
    if (action === 'delete') {
      set(cartProductsData, deleteProducts(products, payload as CartPayload));
    } else if (action === 'update') {
      set(cartProductsData, updateProducts(products, payload as CartPayload));
    } else if (action === 'add') {
      set(cartProductsData, addProducts(products, payload as CartPayload));
    }
  }
})
