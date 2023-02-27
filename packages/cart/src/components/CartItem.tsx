import React from 'react';
import {
  Image,
  Button,
} from 'antd';
import {
  CloseOutlined,
} from '@ant-design/icons';

import { ProductData } from '../types';

interface CartItemProps {
  data: ProductData;
}

const CartItem: React.FC<CartItemProps> = (props) => {
  const {
    data,
  } = props;


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
          <p>数量:1</p>
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
            <Button type="text">-</Button>
            <Button type="text">+</Button>
          </div>
        </div>
      </div>
      <Button type="text" className="cart-item-close">
        <CloseOutlined />
      </Button>
    </div>
  );
}

export default CartItem;
