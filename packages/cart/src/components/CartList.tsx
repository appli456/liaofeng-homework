import React from 'react';
import CartItem from "./CartItem";
import {useRecoilValue} from "recoil";
import { cartProductsData } from "../states";

type CartListProps = {
  // list: ProductData[];
}

const CartList: React.FC<CartListProps> = () => {

  const list = useRecoilValue(cartProductsData);

  return (
    <div className="cart-item-list">
      {
        list && list.length ? list.map((v, i) => {
          return (
            <CartItem data={v} key={`${i}-${v.id}`} />
          )
        }) : null
      }
    </div>
  );
};

export default CartList;
