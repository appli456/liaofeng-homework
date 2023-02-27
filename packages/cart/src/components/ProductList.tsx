import React from 'react';
import {Col, Row} from "antd";

import { ProductData } from "../types";
import Product from "./Product";

interface ProductListProps {
  list: ProductData[][];
}

const ProductList: React.FC<ProductListProps> = ({ list }) => {
  if (!Array.isArray(list)) {
    return null
  }

  return (
    <React.Fragment>
      {
        list && list.length ? list.map((products: ProductData[], index) => {
          if (!Array.isArray(products)) {
            return null;
          }

          return (
            <Row key={`${products.length}-${index}`}>
              {
                products.map((product, j) => {
                  return (
                    <Col
                      span={6}
                      key={`${product.createdAt}-${product.price}-${j}-${index}`}
                    >
                      <Product
                        data={product}
                      />
                    </Col>
                  )
                })
              }
            </Row>
          );
        }) : null
      }
    </React.Fragment>
  );
}

export default ProductList;
