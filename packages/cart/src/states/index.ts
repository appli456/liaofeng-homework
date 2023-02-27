import {
  atom, RecoilValue, RecoilValueReadOnly,
  selector,
  selectorFamily,
} from 'recoil';
import { ProductData } from "../types";
import axios from "axios";
import {deleteProducts, divideArray} from "../utils";

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

type CartMethod = {
  action: 'delete' | 'update' | 'read' | 'search',
  payload: Pick<ProductData, 'id'> | null | Pick<ProductData, 'id'>[]
}

export const cartProductsData = atom<ProductData[]>({
  key: 'cart-product-data',
  default: [],
})

export const cartProducts = selectorFamily<ProductData[], CartMethod>({
  key: 'cart-products',
  get: (method: CartMethod) => ({ get }) => {
    return get(cartProductsData)
  },

  set: (method: CartMethod) => ({ get, set }) => {
    const products = get(cartProductsData);

    if (method.action === 'delete') {
      set(cartProductsData, deleteProducts(products, method.payload));
    }
  }
})
