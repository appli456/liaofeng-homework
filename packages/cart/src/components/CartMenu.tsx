import React from 'react';
import {Button, Typography} from "antd";
import {useRefreshProductList} from "../hooks/useRefreshProductList";

function CartMenu() {

  return (
    <div>
      <div>
        <Typography.Text>尺码:</Typography.Text>
        <div>
          <Button onClick={useRefreshProductList({ size: Math.random().toString() })}>XS</Button>
          <Button>S</Button>
          <Button>M</Button>
          <Button>ML</Button>
          <Button>L</Button>
          <Button>XL</Button>
          <Button>XXL</Button>
        </div>
      </div>

      <div>
        <Typography.Text>排序:</Typography.Text>
        <div>
          <Button>售价</Button>
          <Button>人气</Button>
          <Button>销量</Button>
        </div>
      </div>
    </div>
  );
}

export default CartMenu;
