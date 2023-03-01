import React, {useEffect, useState} from 'react';
import { Layout, Col, Row, Typography, Drawer, Button, notification } from 'antd';
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";

import ProductList from "../components/ProductList";
import CartList from "../components/CartList";
import CartMenu from "../components/CartMenu";
import Loading from "../components/Loading";
import {countPrice, divideArray} from "../utils";
import {ProductData, SortBy} from "../types";
import {useRecoilValue} from "recoil";
import {cartCount, cartProductsData} from "../states";

function Cart() {
  const [ list, setList ] = useState<ProductData[][]>([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ open, setOpen ] = useState(false);
  const cartData = useRecoilValue(cartProductsData);
  const count = useRecoilValue(cartCount);

  function fetchData() {
    setLoading(true);
    axios.get('https://63ef1aa7271439b7fe683af3.mockapi.io/products').then((response) => {
      const json = response.data;
      if (Array.isArray(json)) {
        setList(divideArray(json, 4));
        return;
      }

      return setList([]);
    }).finally(() => {
      setLoading(false);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const onOpenDrawer = () => {
    setOpen(true);
  }
  const onClose = () => {
    setOpen(false)
  };

  const onChangeSize = (size: string) => {
    fetchData();
  }

  const onSort = (sortBy: SortBy) => {
    fetchData();
  }

  const onCheckout = () => {
    if (cartData.length) {

      notification.info({
        message: '结算'
      });
    } else {
      notification.warning({
        message: '请先加购商品',
      })
    }
  }

  return (
    <Layout.Content>
      <div className="cart-icon-container" onClick={onOpenDrawer}>
        <ShoppingCartOutlined className="cart-icon" />
        <span
          className="cart-icon-count"
        >
          {count}
        </span>
      </div>
      <Row className="content">
        <Col span={6}>
          <CartMenu onChangeSize={onChangeSize} onSort={onSort} />
        </Col>
        <Col span={18}>
          <Typography.Title level={3}>Product(s) Found</Typography.Title>
          <ProductList list={list} />
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
            <Typography.Title level={2}>总价: {countPrice(cartData)}</Typography.Title>
            <Button
              onClick={onCheckout}
              type="primary"
              block={true}
            >
              结算
            </Button>
          </div>
        </div>
      </Drawer>
      {
        isLoading ? <Loading/> : null
      }
    </Layout.Content>
  );
}

export default Cart;
