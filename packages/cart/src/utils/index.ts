import {CartData, ProductData} from "../types";
import {CartPayload} from "../states";

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

export function deleteProducts(products: CartData[], ids: Pick<CartData, 'id'> | null | Pick<CartData, 'id'>[]): CartData[] {
  if (!ids) {
    return products;
  }

  if (Array.isArray(ids)) {
    const nextArray: CartData[] = [];
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

export function updateProducts(
  products: CartData[],
  payload: CartPayload) {
  if (!payload) {
    return products;
  }

  if (Array.isArray(payload)) {
    const productMap = payload.reduce((obj: Record<string, CartData>, product) => {
      if (Object.prototype.hasOwnProperty.call(obj, product.id)) {
        obj[product.id] = product;
      }

      return obj
    }, {});


    return products.map((product) => {
      if (Object.prototype.hasOwnProperty.call(productMap, product.id)) {
        const value = productMap[product.id];

        return {
          ...product,
          ...value,
        }
      }

      return product;
    });
  }


  return products.map((product) => {
    if (product.id === payload.id) {
      return {
        ...product,
        ...payload,
      }
    }

    return product;
  })
}

export function addProducts(
  products: CartData[],
  payload: CartPayload,
) {
  if (!payload) {
    return products;
  }

  const productsMap = products.reduce((obj: Record<string, CartData>, product) => {
    obj[product.id] = product;
    return obj;
  }, {});

  if (Array.isArray(payload)) {
    payload = payload.filter((p) => {
      return !Object.prototype.hasOwnProperty.call(productsMap, p.id);
    })

    for (let i = 0; i < payload.length; ++i) {
      const item = payload[i];
      if (!item.quantity) {
        item.quantity = 1;
      }
    }

    return products.concat(payload);
  }

  if (!Object.prototype.hasOwnProperty.call(productsMap, payload.id)) {
    if (!payload.quantity) {
      payload.quantity = 1;
    }

    return products.concat([payload]);
  }

  return products;
}

export function countPrice(products: ProductData[]): string {
  const total = products.reduce((prevTotal: number, product: ProductData) => {
    const price = parseFloat(product.price) * 100;
    return prevTotal + price
  }, 0);
  return (total / 100).toFixed(2);
}
