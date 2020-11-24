import React from "react";
import { Tabs, Col, Row, Button } from 'antd';
import Promotions from "./Promotions";
const { TabPane } = Tabs;


const PromotionDetails = () => {
  const callback = (key) =>{
    console.log(key);
  }

  return (
    <React.Fragment>
    <Row style={{ marginLeft: "400px" , marginRight: "20px", marginTop: "100px", marginBottom:"20px"}}>
    <Col md={12}>
      <label style={{fontWeight: "bold", color: "blue", fontSize: "20px"}}>QUẢN LÝ DANH MỤC KHUYẾN MÃI</label>
    </Col>
  </Row>
  <Tabs onChange={callback} type="card">
    <TabPane tab="Quản lý danh mục khuyến mãi" key="1">
      <Promotions/>
    </TabPane>
    <TabPane tab="Quản lý khuyến mãi" key="2">
        
    </TabPane>
  </Tabs>
    </React.Fragment>
  );
};

export default PromotionDetails;
