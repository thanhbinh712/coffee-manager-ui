import React from "react";
import { Tabs, Col, Row, Button } from 'antd';
import Areas from "../components/Areas";
import Tables from "../components/Tables";
const { TabPane } = Tabs;


const AreaTables = () => {
  const callback = (key) =>{
    console.log(key);
  }

  return (
    <React.Fragment>
    <Row style={{ marginLeft: "400px" , marginRight: "20px", marginTop: "100px", marginBottom:"20px"}}>
    <Col md={12}>
      <label style={{fontWeight: "bold", color: "blue", fontSize: "20px"}}>QUẢN LÝ KHU VỰC - BÀN</label>
    </Col>
  </Row>
  <Tabs onChange={callback} type="card">
    <TabPane tab="Quản lý khu vực" key="1">
      <Areas/>
    </TabPane>
    <TabPane tab="Quản lý bàn" key="2">
      <Tables/>
    </TabPane>
  </Tabs>
    </React.Fragment>
  );
};

export default AreaTables;
