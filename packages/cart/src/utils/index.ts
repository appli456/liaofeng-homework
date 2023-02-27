import {ProductData} from "../types";
import product from "../components/Product";

export function divideArray<T>(arr: T[], groupNumber: number): T[][] {
  const nextArray: T[][] = [];

  arr.forEach((v, i) => {
    if (i % groupNumber === 0) {
      nextArray.push([v]);
    } else {
      const lastIndex = nextArray.length - 1;
      nextArray[lastIndex].push(v);
    }
  });

  return nextArray;
}

export function deleteProducts(products: ProductData[], ids: Pick<ProductData, 'id'> | null | Pick<ProductData, 'id'>[]): ProductData[] {
  if (!ids) {
    return products;
  }

  if (Array.isArray(ids)) {
    const nextArray: ProductData[] = [];
    const idMap = ids.reduce((obj: Record<string, boolean>, id) => {
      if (Object.prototype.hasOwnProperty.call(obj, id.id)) {
        obj[id.id] = true;
      }

      return obj
    }, {});
    products.forEach((product) => {
      if (!Object.prototype.hasOwnProperty.call(idMap, product.id)) {
        nextArray.push(product);
      }
    });

    return nextArray;
  }

  return products.filter((product) => {
    return product.id !== ids.id;
  });
}
