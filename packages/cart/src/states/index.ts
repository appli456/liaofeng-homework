import {
  atom, selector,
  selectorFamily,
} from 'recoil';
import {
  addProducts,
  deleteProducts,
  updateProducts,
} from "../utils";

import {
  CartData,
} from "../types";
import cache from "../utils/Cache";
import {notification} from "antd";

export type MethodPayload = {
  [K in keyof CartData]: CartData[K]
}

type CartAction = 'delete' | 'update' | 'read' | 'search' | 'add';
export type CartPayload = MethodPayload | null | MethodPayload[];

export const cartProductsData = atom<CartData[]>({
  key: 'cart-product-data',
  default: cache.get('cart-data') || [],
})

export const cartProducts = selectorFamily<CartPayload, CartAction>({
  key: 'cart-products',
  get: () => ({ get }) => {
    return get(cartProductsData)
  },

  set: (action: CartAction) => ({ get, set }, payload) => {
    const products = get(cartProductsData);
    if (action === 'delete') {
      const newValue = deleteProducts(products, payload as CartPayload)
      set(cartProductsData, newValue);
      cache.set('cart-data', newValue)
    } else if (action === 'update') {
      const newValue = updateProducts(products, payload as CartPayload);
      set(cartProductsData, newValue);
      cache.set('cart-data', newValue)
    } else if (action === 'add') {
      const newValue = addProducts(products, payload as CartPayload);
      if (newValue.length === products.length) {
        notification.warning({message: '已在购物车中'});
      }

      set(cartProductsData, newValue);
      cache.set('cart-data', newValue)
    }
  }
});

export const cartCount = selector({
  key: 'cart-count',
  get: ({ get }) => {
    const products = get(cartProductsData);
    return products.length;
  }
})
