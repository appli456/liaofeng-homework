import React from 'react';
import {Button, Typography} from "antd";
import {SortBy} from "../types";

interface CartMenuProps {
  onChangeSize: (size: string) => void;
  onSort: (sortBy: SortBy) => void;
}

function CartMenu(props: CartMenuProps) {
  const { onChangeSize, onSort } = props;

  function createChangeSize(size: string) {
    return () => {
      onChangeSize(size);
    }
  }

  function createSort(sortBy: SortBy) {
    return () => {
      onSort(sortBy);
    }
  }

  return (
    <div>
      <div>
        <Typography.Title level={3}>尺码:</Typography.Title>
        <div>
          <Button
            onClick={createChangeSize('xs')}
          >
            XS
          </Button>
          <Button
            onClick={createChangeSize('s')}
          >
            S
          </Button>
          <Button
            onClick={createChangeSize('m')}
          >
            M
          </Button>
          <Button
            onClick={createChangeSize('ml')}
          >
            ML
          </Button>
          <Button
            onClick={createChangeSize('l')}
          >
            L
          </Button>
          <Button
            onClick={createChangeSize('xl')}
          >
            XL
          </Button>
          <Button
            onClick={createChangeSize('xxl')}
          >
            XXL
          </Button>
        </div>
      </div>

      <div>
        <Typography.Title level={3}>排序:</Typography.Title>
        <div>
          <Button onClick={createSort('price')}>售价</Button>
          <Button onClick={createSort('popularity')}>人气</Button>
          <Button onClick={createSort('sales')}>销量</Button>
        </div>
      </div>
    </div>
  );
}

export default CartMenu;
