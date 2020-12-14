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
    <div
        style={{
          fontWeight: "bold",
          color: "#001529",
          fontSize: "30px",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        QUẢN LÝ DANH MỤC - SẢN PHẨM
      </div>
  <Tabs onChange={callback} type="card" style={{ marginLeft: "20px" }}>
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
