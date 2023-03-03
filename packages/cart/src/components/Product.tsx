import React from 'react';
import {
  Card,
  Image,
  Button,
} from 'antd';

import { ProductData } from '../types';
import {useRecoilState} from "recoil";
import {cartProducts} from "../states";

interface ProductProps {
  data: ProductData;
}

const Product: React.FC<ProductProps> = (props) => {
  const {
    data,
  } = props;

  const [ , addCartData ] = useRecoilState(cartProducts( 'add'))

  function onAddCart() {
    addCartData({
      ...data,
      quantity: 1,
    });
  }

  return (
    <Card
      cover={(
        <Image
          src={data.image}
          alt={data.name}
          preview={false}
        />)}
      className="product-item"
    >
      <p>{data.name}</p>
      <p>{`$ ${data.price}`}</p>
      <Button
        type="primary"
        block={true}
        onClick={onAddCart}
      >
        加入购物车
      </Button>
    </Card>
  );
}

export default React.memo(Product);
