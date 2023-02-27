import React from 'react';
import {
  Card,
  Image,
  Button,
} from 'antd';

import { ProductData } from '../types';

interface ProductProps {
  data: ProductData;
  onAddCart?: (data: ProductData) => void;
}

const Product: React.FC<ProductProps> = (props) => {
  const {
    data,
    onAddCart,
  } = props;

  return (
    <Card
      cover={(<Image src={data.image} alt={data.name} preview={false} />)}
    >
      <p>{data.name}</p>
      <p>{`$ ${data.price}`}</p>
      <Button
        type="primary"
        block={true}
      >
        加入购物车
      </Button>
    </Card>
  );
}

export default React.memo(Product);
