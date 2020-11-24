import React from "react";
import { Tabs, Col, Row, Button } from 'antd';
import Products from "./Products";
import Types from "./Types";
const { TabPane } = Tabs;


const ProductTypes = () => {
  const callback = (key) =>{
    console.log(key);
  }

  return (
    <React.Fragment>
    <Row style={{ marginLeft: "400px" , marginRight: "20px", marginTop: "100px", marginBottom:"20px"}}>
    <Col md={12}>
      <label style={{fontWeight: "bold", color: "blue", fontSize: "20px"}}>QUẢN LÝ DANH MỤC - SẢN PHẨM</label>
    </Col>
  </Row>
  <Tabs onChange={callback} type="card">
    <TabPane tab="Quản lý danh mục sản phẩm" key="1">
      <Types/>
    </TabPane>
    <TabPane tab="Quản lý sản phẩm" key="2">
      <Products/>
    </TabPane>
  </Tabs>
    </React.Fragment>
  );
};

export default ProductTypes;
