import React from "react";
import { Tabs, Col, Row, Button } from "antd";
import Ingredients from "../components/Ingredients";
import Imports from "../components/Imports";

const { TabPane } = Tabs;

const Inventory = () => {
  const callback = (key) => {
    console.log(key);
  };

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
        QUẢN LÝ KHO
      </div>
      <Tabs onChange={callback} type="card" style={{ marginLeft: "20px" }}>
        <TabPane tab="Quản lý nguyên liệu" key="1">
          <Ingredients />
        </TabPane>
        <TabPane tab="Nhập nguyên liệu" key="2">
          <Imports />
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
};

export default Inventory;
