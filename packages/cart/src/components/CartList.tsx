import React from 'react';
import { ProductData } from "../types";
import CartItem from "./CartItem";

interface CartListProps {
  list: ProductData[];
}

const CartList: React.FC<CartListProps> = ({ list }) => {

  return (
    <div className="cart-item-list">
      {
        list && list.length && list.map((v, i) => {
          return (
            <CartItem data={v} key={i} />
          )
        })
      }
    </div>
  );
};

export default CartList;
