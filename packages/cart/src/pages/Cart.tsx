import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Layout, Col, Row, Typography, Drawer, Button } from 'antd';
import { ShoppingCartOutlined } from "@ant-design/icons";

import { showProductData} from "../states";
import ProductList from "../components/ProductList";
import CartList from "../components/CartList";
import { ProductData } from "../types";
import CartMenu from "../components/CartMenu";

function Cart() {
  const data = useRecoilValue<ProductData[][]>(showProductData);
  const [ open, setOpen ] = useState(false);

  const onOpenDrawer = () => {
    setOpen(true);
  }
  const onClose = () => {
    setOpen(false)
  };

  return (
    <Layout.Content>
      <div className="cart-icon-container" onClick={onOpenDrawer}>
        <ShoppingCartOutlined className="cart-icon" />
      </div>
      <Row className="content">
        <Col span={6}>
          <CartMenu />
        </Col>
        <Col span={18}>
          <Typography.Text>Product(s) Found</Typography.Text>
          <ProductList list={data} />
        </Col>
      </Row>

      <Drawer
        placement="right"
        closable={false}
        open={open}
        onClose={onClose}
        width={640}
      >
        <div className="cart-item-list-container">
          <div className="cart-sidebar-title">
            <ShoppingCartOutlined className="cart-icon" />
            <Typography.Text>
              购物车
            </Typography.Text>
          </div>
          <CartList />
          <div className="cart-sidebar-footer">
            <Typography.Text>总价: 0</Typography.Text>
            <Button
              type="primary"
              block={true}
            >
              结算
            </Button>
          </div>
        </div>
      </Drawer>
    </Layout.Content>
  );
}

export default Cart;
