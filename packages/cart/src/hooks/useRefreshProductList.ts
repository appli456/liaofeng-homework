import { atom, selectorFamily, useSetRecoilState } from "recoil";
import {ProductData, ProductQuery} from "../types";
import { productQuery } from "../states";
import axios from "axios";

export function useRefreshProductList(query: ProductQuery) {
  const setProductQuery = useSetRecoilState(productQuery)
  return () => {
    setProductQuery(query);
  }
}

export const products = atom<ProductData[]>({
  key: 'product',
  default: [],
});

export const productData = selectorFamily<ProductData[], ProductQuery>({
  key: 'product-data',
  get: () => ({ get }) => {
    return get(products);
  },

  set: (query) => async ({ set }) => {
    const response = await axios.get('https://63ef1aa7271439b7fe683af3.mockapi.io/products');
    const json = response.data;
    if (Array.isArray(json)) {
      set(products, json);
    }
  }
})
