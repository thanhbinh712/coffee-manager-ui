import React from "react";
import { Tabs, Col, Row, Button } from 'antd';
import Ingredients from "../components/Ingredients";
import Imports from "../components/Imports";

const { TabPane } = Tabs;


const Inventory = () => {
  const callback = (key) =>{
    console.log(key);
  }

  return (
    <React.Fragment>
    <Row style={{ marginLeft: "400px" , marginRight: "20px", marginTop: "100px", marginBottom:"20px"}}>
    <Col md={12}>
      <label style={{fontWeight: "bold", color: "blue", fontSize: "20px"}}>QUẢN LÝ KHO</label>
    </Col>
  </Row>
  <Tabs onChange={callback} type="card">
    <TabPane tab="Quản lý nguyên liệu" key="1">
      <Ingredients/>
    </TabPane>
    <TabPane tab="Nhập nguyên liệu" key="2">
      <Imports/>
    </TabPane>
  </Tabs>
    </React.Fragment>
  );
};

export default Inventory;
