import React from 'react';
import {
  Image,
  Button,
} from 'antd';
import {
  CloseOutlined,
} from '@ant-design/icons';

import {CartData} from '../types';
import {useRecoilState} from "recoil";
import {cartProducts} from "../states";

interface CartItemProps {
  data: CartData;
}

const CartItem: React.FC<CartItemProps> = (props) => {
  const {
    data,
  } = props;

  const [, deleteProducts] = useRecoilState(cartProducts('delete'));
  const [, updateProducts] = useRecoilState(cartProducts('update'));

  function onDelete() {
    deleteProducts(data);
  }

  function onDecreaseQuantity() {
    updateProducts({
      ...data,
      quantity: data.quantity - 1,
    })
  }

  function onIncreaseQuantity() {
    updateProducts({
      ...data,
      quantity: data.quantity + 1,
    })
  }

  return (
    <div className="cart-item">
      <Image
        src={data.image}
        width={120}
        height={180}
        alt={data.name}
        preview={false}
      />
      <div className="cart-item-content">
        <div>
          <p>{data.name}</p>
          <p>数量:{data.quantity}</p>
        </div>
        <div>
          <p>{`$ ${data.price}`}</p>
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              flex: 1
            }}
          >
            <Button type="text" onClick={onDecreaseQuantity}>-</Button>
            <Button type="text" onClick={onIncreaseQuantity}>+</Button>
          </div>
        </div>
      </div>
      <Button
        type="text"
        className="cart-item-close"
        onClick={onDelete}
      >
        <CloseOutlined />
      </Button>
    </div>
  );
}

export default CartItem;
