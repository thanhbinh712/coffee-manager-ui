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
    <div
        style={{
          fontWeight: "bold",
          color: "#001529",
          fontSize: "30px",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        QUẢN LÝ KHU VỰC - BÀN
      </div>
  <Tabs onChange={callback} type="card" style={{ marginLeft: "20px" }}>
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
